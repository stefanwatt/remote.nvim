export const mkdir = (path:string):0|1=>{
  if (!(vim.fn.isdirectory(path) === 1))
    return vim.fn.mkdir(`${path}`,"p")
  else 
    return 0
}
