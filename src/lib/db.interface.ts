interface DB {
  execute: (...hehe: any[]) => any;
}

export class SQL implements DB {
  constructor() {}
  execute(asdasd: string, asdasdse: number) {}
}

export class MongoDB implements DB {
  constructor() {}
  execute() {}
}
