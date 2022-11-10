import { mkdir } from "./fs"
import { getSshHosts, readSshConfigFile } from "./sshConfig"

const HOME = os.getenv('HOME')
const sshConfigPath = `${HOME}/.ssh/config`
const sshConfigFileContent = readSshConfigFile(sshConfigPath)
const sshHosts = getSshHosts(sshConfigFileContent)

//TODO replace with telescope picker
const selectedHost = sshHosts.find(host => host.user==="archlinux")
mkdir(`${HOME}/foo`)
