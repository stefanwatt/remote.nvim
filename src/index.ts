import { mkdir } from "./fs"
import { getSshHosts, readSshConfigFile } from "./sshConfig"

const HOME = os.getenv('HOME')
const sshConfigPath = `${HOME}/.ssh/config`
const sshConfigFileContent = readSshConfigFile(sshConfigPath)
const sshHosts = getSshHosts(sshConfigFileContent)

const sshfsConnect = ({
    selectedHost,
    localDirPath,
    remoteDirPath,
    portSuffix
  }: {
    selectedHost:Host,
    localDirPath:string,
    remoteDirPath:string,
    portSuffix:string
  }):number=>{
  return os.execute(`sshfs ${selectedHost.user}@${selectedHost.hostName}:${remoteDirPath}${portSuffix} ${localDirPath}`)
}

const connectToHost = ()=>{
  const hostLabel = vim.fn.input("enter host label: ")
  const selectedHost = sshHosts.find(host => host.name===hostLabel)
  if (!selectedHost) return

  const dirname = "ioaENHtoieaHNT"
  const localDirPath = `${HOME}/${dirname}`

  if (mkdir(localDirPath) === 0) return 

  const remoteDirPath = vim.fn.input("enter remote dir")
  if(!remoteDirPath) return

  const portSuffix = !selectedHost.port ? "":`-p ${selectedHost.port}`

  if(sshfsConnect({selectedHost,localDirPath,remoteDirPath,portSuffix}) !== 0) print("error sshfs")

  vim.cmd(`e ${localDirPath}`)
}

vim.api.nvim_create_user_command("RemoteDev",connectToHost,{})
