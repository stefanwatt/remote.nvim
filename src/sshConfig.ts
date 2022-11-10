export const readSshConfigFile = (path: string = '~/.ssh/config'): string => {
  const sshConfigFile = io.open(path, 'rb')[0]
  const content = sshConfigFile?.read('*a')
  sshConfigFile?.close()
  if (!content) throw new Error('error reading config file')
  return content
}

export const getSshHosts = (sshConfigContent: string): Host[] => {
  const hostChunks: string[] = sshConfigContent.split('Host ')
  return hostChunks
    .filter((chunk) => !!chunk && chunk.trim() !== '')
    .map((chunk) => {
      const lines: string[] = chunk.split('\n').map((line) => line.trim())

      const name = lines[0]

      const hostNameLine = lines.find((line) => line.includes('HostName'))
      if (!hostNameLine) throw new Error('invalid ssh config')
      const hostName = hostNameLine.split(' ')[1]

      const userLine = lines.find((line) => line.includes('User'))
      if (!userLine) throw new Error('invalid ssh config')
      const user = userLine.split(' ')[1]

      let port
      const portLine = lines.find((line) => line.includes('Port'))
      if (portLine) port = +portLine?.split(' ')[1]

      return { name, hostName, user, port }
    })
}


