---
name: cerrar-sesion
description: Cerrar sesión — da el veredicto de si la sesión es cerrable, rescata todo cabo suelto que viva solo en la conversación (a ticket, PR, decisión, memoria, handoff u otra sesión) y ofrece mejoras al entorno. Usala apenas el usuario dice "cerrar sesión", "cerramos", "cierro", "listo por hoy" o que termina la sesión, o antes de un /clear.
---

# Cerrar sesión

Al cerrar, la conversación se pierde. Todo lo que importa tiene que tener ya un **hogar**
durable: un ticket, un PR o commit, una decisión registrada, un doc, la memoria, un handoff, u
otra sesión viva que lo esté haciendo. Un **cabo suelto** es algo que hoy vive solo en la
conversación (o en un lugar que se borra solo). Este skill los encuentra, prueba el hogar de
cada uno y da el veredicto. No cierra nada por su cuenta: propone, y el usuario elige.

Si en la conversación ya hay una sección `## Cierre` de una pasada anterior, arrancá desde
ahí y revisá solo lo que pasó después.

## Pasos

### 1. Inventario
Recorré la sesión entera, no solo el final. Si la conversación fue resumida, el transcript
completo es `${CLAUDE_CONFIG_DIR:-$HOME/.claude}/projects/*/$CLAUDE_CODE_SESSION_ID.jsonl`:
buscá ahí lo que el resumen pudo haber comido (decisiones, IDs, "después vemos"). Anotá cada
cabo de estas clases:

- **Decisión** que tomó el usuario o alguien más ("vamos con X", "no tocar Y").
- **Pendiente**: algo prometido o que falta ("falta que…", "después hago", un paso de un
  runbook sin correr), y de quién es.
- **Pregunta abierta** que le debe el usuario, otra persona o Claude.
- **Dato caro**: un ID, ruta, comando o *gotcha* que costó encontrar y no está escrito.
- **Trabajo en vuelo**: cambios sin commitear, branches sin pushear, PRs abiertos, worktrees,
  subagentes, comandos en background, crons de la sesión (`CronList`; mueren al cerrar).
- **Archivos sueltos**: lo creado fuera de un repo (`$TMPDIR`, `/tmp`, `~/Downloads`,
  `$CLAUDE_JOB_DIR/tmp`).
- **Mensajes sin mandar**: borradores para Slack, mails, comentarios en docs.
- **Tickets tocados** y **sesiones lanzadas** (`claude --bg`, handoffs).

Listo cuando cada cabo de la sesión tiene una línea, incluidos los de la primera mitad.

### 2. Probar el hogar de cada cabo
Para cada línea, encontrá dónde vive y **comprobalo con una herramienta**; nunca lo des por
guardado porque "se dijo". Ver **Dónde mirar** abajo. Marcá cada uno:

- ✅ **guardado** — el hogar existe y dice lo mismo que la sesión (con el link o ruta).
- ⚠️ **desactualizado** — el hogar existe pero quedó atrás (el ticket no tiene el último
  estado, la memoria dice algo que la sesión desmintió).
- ❌ **solo acá** — sin hogar, o en uno que se borra solo (`$TMPDIR` y `/tmp` se limpian;
  `$CLAUDE_JOB_DIR` se borra con el job; un cron de sesión muere al cerrar).

Lo ya escrito en otro lado no se copia: se referencia. Listo cuando no queda ninguna línea
sin marca, y cada ✅ tiene su link o ruta.

**Qué hogar elegir.** La memoria es de una máquina y una cuenta: otra máquina, una sesión
desatendida o un compañero no la ven. Lo que tiene que valer en toda sesión de un proyecto (una
regla de proceso, un paso que siempre se corre, un dato del proyecto) va al repo (`CLAUDE.md`,
docs, un script o un check) o al tracker. La memoria queda para lo personal o lo propio de esta
máquina (preferencias, rutas locales, accesos) y para punteros cortos a donde vive el resto,
nunca para el estado de un proyecto que ya está en el tracker.

### 3. Veredicto
Uno de tres:

- **Cerrable** — todo ✅.
- **Cerrable después de guardar** — hay ⚠️ o ❌ que se arreglan escribiendo algo (paso 5).
- **No cerrable todavía** — hay trabajo en vuelo que se corta al cerrar: un subagente o
  comando corriendo, cambios sin commitear que nadie más tiene, un ticket que esta sesión
  reclamó y dejó sin comentario de traspaso, un cron que hace falta. Nombrá qué hay que
  esperar o traspasar.

### 4. Mejoras
Mirá la sesión como una retro: los momentos de fricción, no el resultado. Cada candidata
tiene que señalar un **momento** concreto de la sesión; una sesión sin fricción no tiene
mejoras, y decirlo es una respuesta válida. Fijate en:

- El usuario **corrigió** a Claude o confirmó un enfoque poco obvio → si es una regla del
  proyecto, al `CLAUDE.md`/docs del repo; si es una preferencia personal, memoria `feedback`.
- Claude **buscó mucho** un archivo, ID o dato → un puntero en el `CLAUDE.md`/docs del repo;
  memoria `reference` solo si es propio de esta máquina.
- Un **error que un check atrapa** (lint, test, hook) → ticket para el check.
- Un **flujo a mano repetido** → skill nuevo, o ajuste a uno existente que falló.
- **Falta de acceso** o permisos que frenaron (modo auto bloqueando, una credencial) →
  `fewer-permission-prompts`, o pedírselo al usuario.
- **Memoria vieja o mal ubicada**: una memoria que la sesión desmintió → actualizarla o borrarla;
  una que es estado de proyecto o una regla que tiene que valer siempre → mudarla al repo o al
  tracker y dejar, como mucho, un puntero.
- Algo que **tiene que pasar después** y no es de esta sesión → ticket nuevo.

Listo cuando cada candidata nombra su momento, su destino y el texto concreto a escribir.

### 5. Ofrecer y aplicar
Mostrá una tabla corta: los cabos ⚠️/❌ con el arreglo propuesto, y después las mejoras. Una
línea por fila: qué, dónde va, por qué. Después preguntá con `AskUserQuestion`
(`multiSelect`) qué aplicar, agrupando si son más de cuatro.

Aplicá lo elegido. Las escrituras que salen de la máquina (tickets, comentarios, mensajes)
van solo si el usuario las eligió, y commit, push o merge solo con su OK explícito (las reglas
del repo mandan). Un handoff va a una ruta durable (el repo o `~/Downloads`), nunca a
`$TMPDIR`, con el formato del skill `handoff`. Listo cuando cada elegida está escrita y
verificada, y la respuesta termina con `## Cierre`: el veredicto final y la lista de dónde
quedó cada cosa.

## Dónde mirar

Cada repo dice en su `CLAUDE.md` / `AGENTS.md` dónde viven sus tickets y sus decisiones (un
tracker, un script, una carpeta de ADRs). Leelo antes de buscar, y usá lo que nombra.

| Hogar | Cómo comprobarlo |
| --- | --- |
| Ticket | Con la herramienta del tracker que nombra el repo (su script, `gh issue view`, el MCP): el estado coincide con el real y el último comentario dice dónde quedó. Uno nuevo se escribe en el idioma y formato que pide el repo. |
| PR / branch | `gh pr view <n> --json state,url,headRefName`; `git status` y `git log @{u}..` en cada repo y worktree tocado (`git worktree list`). |
| Decisión | El registro de decisiones del repo (ADRs, `docs/decisions/`) o el archivo de decisiones del proyecto. |
| Doc / plan | El archivo o el doc linkeado, leído, no recordado. |
| Memoria | El directorio de memoria que nombra el system prompt (índice `MEMORY.md`). Seguí las reglas de memoria del sistema: una idea por archivo, actualizar antes que duplicar. |
| Otra sesión | `claude agents --json` (o `ListAgents`): la sesión existe, sigue viva, y su prompt o handoff cubre el cabo. |
| Handoff | El archivo existe en una ruta durable y menciona el cabo. |
