export const useDatabaseStore = defineStore('databaseStore', () => {
  const database = useCookie<DatabaseType>('server:database', {
    default: () => 'relational',
    watch: true,
  })
  const setDatabase = (newDatabase: DatabaseType) => {
    database.value = newDatabase
  }

  return {
    database: readonly(database),
    setDatabase,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDatabaseStore, import.meta.hot))
}
