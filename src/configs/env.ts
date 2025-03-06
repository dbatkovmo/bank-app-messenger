const developmentHost = 'http://localhost:5050/'
const productionHost = 'https://bank-app-socket.up.railway.app/'

/*.env.* файлы vite поддерживает специфически
 * При использовании npm пакета в других проектах,
 * отличных от vita - будут проблемы с доступом к переменным*/

export const env = {
  socket_host: process.env.NODE_ENV === 'development' ? developmentHost : productionHost
}
