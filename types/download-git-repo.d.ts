// filepath: types/download-git-repo.d.ts
declare module 'download-git-repo' {
  function downloadGitRepo(repo: string, dest: string, options?: object, fn?: (err?: object | undefined) => void): Promise<void>;
  export = downloadGitRepo;
}