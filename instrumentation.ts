/*instrumentation.ts*/
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { PeriodicExportingMetricReader, ConsoleMetricExporter } from "@opentelemetry/sdk-metrics";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import pkg from "./package.json";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { CompositePropagator, W3CBaggagePropagator, W3CTraceContextPropagator } from "@opentelemetry/core";
import crypto from "crypto";

import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: pkg.name,
  [SemanticResourceAttributes.SERVICE_VERSION]: pkg.version,
  [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: crypto.randomUUID(),
});

const traceExporter = new OTLPTraceExporter({
  url: "https://otlp.eu01.nr-data.net:4318/v1/traces",
  headers: {
    "api-key": "eu01xx98135b4cf72b4153f76a2c5a6ad177NRAL",
  },
});

const sdk = new NodeSDK({
  resource,
  traceExporter,
  textMapPropagator: new CompositePropagator({
    propagators: [new W3CBaggagePropagator(), new W3CTraceContextPropagator()],
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-pg": {
        requireParentSpan: true,
        enhancedDatabaseReporting: true,
      },
      "@opentelemetry/instrumentation-express": {
        enabled: true,
      },
    }),
  ],
  autoDetectResources: true,
});

sdk.start();
