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
    password,
    portSuffix
  }: {
    selectedHost:Host,
    localDirPath:string,
    remoteDirPath:string,
    password:string
    portSuffix:string
  }):number=>{
  return os.execute(`echo ${password} | sshfs ${selectedHost.user}@${selectedHost.hostName}:${remoteDirPath} -o password_stdin${portSuffix} ${localDirPath}`)
}

const connectToHost = ()=>{
  const hostLabel = vim.fn.input("enter host label: ")
  const selectedHost = sshHosts.find(host => host.name===hostLabel)
  if (!selectedHost) return print("host not found")

  const dirname = "ioENHoieaHNashtashtT"
  const localDirPath = `${HOME}/${dirname}`

  if (mkdir(localDirPath) === 0) return // handle dir exists

  const remoteDirPath = vim.fn.input("enter remote dir: ")
  if(!remoteDirPath) return

  const portSuffix = !selectedHost.port ? "":` -p ${selectedHost.port}`

  const password = vim.fn.input("enter password: ")

  if(sshfsConnect({selectedHost,localDirPath,remoteDirPath,password,portSuffix}) !== 0) print("error sshfs")
  else os.execute(`nvim ${localDirPath}`)
}

vim.api.nvim_create_user_command("RemoteDev",connectToHost,{})
