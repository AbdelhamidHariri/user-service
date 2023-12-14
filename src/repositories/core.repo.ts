export interface CoreRepo<TEntity> {
  getById: (id: string) => Promise<TEntity>;
  getAll: () => Promise<TEntity>;
  delete: (id: string) => Promise<TEntity>;
}
