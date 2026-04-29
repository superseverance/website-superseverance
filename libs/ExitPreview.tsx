interface ExitPreviewCompoent {
  enable: boolean
  slug: string
}

export const ExitPreview = ({ enable, slug }: ExitPreviewCompoent) => enable ? (
  <div className="absolute left-0 right-0 bottom-0 py-2 px-12 inline-flex items-center bg-danger-700 z-10" >
    <p className="text-xs text-white/75 w-full" >
      Se in in modalità <b>anterprima</b>, per uscire clicca su
      < a href={`/api/exit?slug=${slug}`} className="font-medium mx-1 underline underline-offset-4 hover:underline-offset-2 transition-all hover:text-white" >Esci</a>
    </p>
  </div>
) : null