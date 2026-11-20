/* eslint-disable @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars */
// O vitest-axe 0.1.0 declara o matcher no namespace Vi (API antiga).
// O Vitest 5 usa a augmentacao do modulo 'vitest', com dois parametros de tipo.
// Module augmentation exige interfaces que apenas estendem o tipo original,
// por isso as duas regras acima sao desabilitadas neste arquivo de tipos.
import type { AxeMatchers } from 'vitest-axe/matchers'

declare module 'vitest' {
  interface Assertion<R extends void | Promise<void> = void, T = unknown> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
