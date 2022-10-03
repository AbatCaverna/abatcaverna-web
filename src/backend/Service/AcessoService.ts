export default class AcessoService {
  public checkCode(code: string) {
    if (code === process.env.ABAT_TOKEN) {
      return true
    }

    return false
  }
}