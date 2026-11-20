[ACHADO] S-003 — Retrato fora da interface incluído no artefato público
Severidade: baixa
Onde: `public/nova-identidade/foto/` e diretório correspondente em `dist/`.

Como reproduzir:

1. Execute `npm run build` e liste `dist/nova-identidade/foto/`.
2. No preview local da porta 5184, confira com `curl.exe -sSI` a URL correspondente a cada arquivo listado. Compare com as referências de ativos em `src/` e `index.html`.

Impacto: quem conhece o caminho consegue obter duas cópias do retrato e seus metadados de procedência mesmo sem um link na interface. A publicação dessas versões deve ser confirmada antes de incluí-las no artefato público.

Evidência: as versões PNG e WebP responderam HTTP 200 com os tipos de imagem esperados. O PNG contém um bloco `caBX` e o WebP contém um bloco `C2PA`. A inspeção encontrou estruturas de ingredientes, ações, hash e assinatura. A triagem estrutural não identificou blocos EXIF/XMP nem marcadores de GPS ou e-mail nos retratos. A validação criptográfica e a decodificação completa do manifesto ficaram fora da verificação.

Sugestão de defesa: publicar apenas os ativos aprovados e usados no ciclo. Se o retrato for publicado posteriormente, revisar a versão escolhida e seu manifesto.

