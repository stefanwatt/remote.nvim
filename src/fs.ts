export const mkdir = (path:string)=>{
  if (!(vim.fn.isdirectory(path) === 1))
    vim.fn.mkdir(`${path}`,"p")
}
