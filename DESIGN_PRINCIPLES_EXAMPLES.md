# Ejemplos de Principios de Diseño en expenses-tracking

Este documento muestra ejemplos reales del repositorio que aplican correctamente principios de diseño, comparándolos con versiones inventadas que los violarían.

---

## 1. LEY DE DEMETER

**Archivo**: `apps/tracker-spa/src/routes/(private)/$budgetId/-route/loader.ts:4-16`

### ✅ CÓDIGO REAL DEL REPOSITORIO (aplica el principio)

```typescript
export default async function budgetIdLoader(
  { globalContainer }: { globalContainer: Ctx },
  deps: { color?: string; icon?: string; name?: string }
) {
  const { color, icon, name } = deps
  const workspaceService = globalContainer.get('workspace')

  const [budgetName, budgetColor, budgetIcon] = await Promise.all([
    name ? Promise.resolve(name) : workspaceService.getName(),
    color ? Promise.resolve(color) : workspaceService.getColor(),
    icon ? Promise.resolve(icon) : workspaceService.getIcon()
  ])

  return {
    budgetName,
    color: budgetColor,
    icon: iconsByName[budgetIcon]({})
  }
}
```

### ❌ CÓDIGO INVENTADO (si NO aplicara el principio)

```typescript
export default async function budgetIdLoader(
  { globalContainer }: { globalContainer: Ctx },
  workspace: Workspace  // ← Recibe objeto completo en lugar de primitivos
) {
  // ← Viola Ley de Demeter: cadena de llamadas a propiedades anidadas
  const budgetName = workspace.currentBudget.details.name
  const budgetColor = workspace.currentBudget.theme.colors.primary
  const budgetIcon = workspace.currentBudget.theme.icon.name

  // ← Conoce la estructura interna profunda del objeto Workspace
  const metadata = workspace.user.preferences.display.budget.metadata

  return {
    budgetName,
    color: budgetColor,
    icon: iconsByName[budgetIcon]({})
  }
}
```

### EXPLICACIÓN:

**✅ El código real:**
- Recibe **datos primitivos** (`string` opcionales) en lugar de objetos complejos
- Solo "habla" con el servicio inmediato (`workspaceService.getName()`), no navega estructuras anidadas
- Permite reutilizar la función pasando valores directos sin necesidad de crear todo un objeto Workspace
- Desacoplado: no conoce ni depende de la estructura interna de `Workspace`

**❌ La versión mala:**
- Viola la Ley de Demeter con cadenas como `workspace.currentBudget.details.name` (3 niveles)
- Cualquier cambio en la estructura interna de `Workspace` rompe esta función
- Alto acoplamiento: necesita conocer toda la jerarquía de objetos
- Difícil de testear: requiere crear objetos complejos con toda su estructura anidada

---

## 2. OPEN/CLOSE PRINCIPLE

**Archivo**: `apps/tracker-spa/src/components/income-form/IncomeForm.tsx:31-58`

### ✅ CÓDIGO REAL DEL REPOSITORIO (aplica el principio)

```typescript
export interface TransactionFormProps {
  titleChip?: string;
  chipColor?: 'success' | 'warning' | 'danger' | 'neutral';
  namePlaceholder?: string;
  defaultValues?: Partial<TransactionFormValues>;
  onSubmit: (values: TransactionFormValues) => Promise<void>;  // ← Estrategia inyectada
  onCancel?: () => void;
}

export default function TransactionForm({
  titleChip = 'Income',
  chipColor = 'success',
  namePlaceholder = 'Name of income',
  defaultValues,
  onSubmit,  // ← Recibe el callback como parámetro
  onCancel,
}: TransactionFormProps) {
  const [state, action, isPending] = useActionState(async (_prev: FormState | null, formData: FormData) => {
    const name = formData.get('name')?.toString() ?? '';
    const amountStr = formData.get('amount')?.toString() ?? '';
    const amount = Number(amountStr);
    const values: TransactionFormValues = { name, amount, description, monthly };

    try {
      await onSubmit(values);  // ← Ejecuta la estrategia sin conocer su implementación
      return { values };
    } catch (error: unknown) {
      const msg = (error as Error | undefined)?.message ?? 'Failed to save income';
      return { errors: [{ id: msg, message: msg }], values };
    }
  }, null);

  // ... JSX renderizado
}
```

### ❌ CÓDIGO INVENTADO (si NO aplicara el principio)

```typescript
export interface TransactionFormProps {
  titleChip?: string;
  chipColor?: 'success' | 'warning' | 'danger' | 'neutral';
  namePlaceholder?: string;
  defaultValues?: Partial<TransactionFormValues>;
  saveMode: 'api' | 'localStorage' | 'mock';  // ← Modo hardcodeado en lugar de estrategia
}

export default function TransactionForm({
  titleChip = 'Income',
  saveMode,  // ← Recibe el tipo de guardado
  ...props
}: TransactionFormProps) {
  const [state, action, isPending] = useActionState(async (_prev, formData: FormData) => {
    const values: TransactionFormValues = { name, amount, description, monthly };

    try {
      // ❌ Viola OCP: necesita modificar este código para cada nuevo tipo de guardado
      if (saveMode === 'api') {
        await fetch('/api/incomes', { method: 'POST', body: JSON.stringify(values) });
      } else if (saveMode === 'localStorage') {
        localStorage.setItem('income-' + Date.now(), JSON.stringify(values));
      } else if (saveMode === 'mock') {
        console.log('Mock save:', values);
      }
      // ← Para añadir "IndexedDB" tendríamos que modificar esta función

      return { values };
    } catch (error: unknown) {
      return { errors: [{ id: 'error', message: 'Failed' }], values };
    }
  }, null);

  // ... JSX renderizado
}
```

### EXPLICACIÓN:

**✅ El código real:**
- **Abierto a extensión**: puede usar cualquier implementación de `onSubmit` sin cambiar el componente
- **Cerrado a modificación**: agregar nuevas formas de guardar (API, localStorage, IndexedDB) no requiere tocar este código
- Usa el patrón **Strategy**: el comportamiento de guardado se inyecta desde fuera
- Fácil de testear: se puede pasar un mock de `onSubmit` sin configuraciones especiales

**❌ La versión mala:**
- Requiere **modificar** el código del componente para cada nuevo tipo de guardado (viola "cerrado a modificación")
- Lógica de negocio mezclada con lógica de presentación
- Difícil de testear: necesitas mockear `fetch`, `localStorage`, etc.
- Crecimiento de complejidad: cada nueva opción añade más ramas `if/else`

---

## 3. ACOPLAMIENTO ESENCIAL VS ACCIDENTAL

**Archivo**: `apps/tracker-spa/src/routes/(private)/$budgetId/incomes/-config/queries.ts:3-18`

### ✅ CÓDIGO REAL DEL REPOSITORIO (aplica el principio)

```typescript
// ← Interfaz abstracta que define el contrato
export interface IncomesQueries {
  listIncomesByBudgetId(budgetId: string): Promise<Array<BasicIncomeDTO>>;
}

declare module './types.ts' {
  export interface IncomesContainerServices {
    incomesQueries: IncomesQueries;  // ← Depende de la abstracción
  }
}

// ← Plugin que registra la abstracción
export default function plugin(ctx: Ctx) {
  ctx.bind('incomesQueries', {
    provider() {
      throw new Error('Not implemented');  // ← Implementación se inyecta después
    },
  });
}

// ← En desarrollo, se inyecta una implementación mock
if (import.meta.env.DEV)
  plugin.mock = function (ctx: Ctx) {
    ctx.bind('incomesQueries', {
      provider() {
        return {
          async listIncomesByBudgetId() {
            return [
              { amount: 1500, createdBy: 'user1', id: '01', name: 'Salary' },
              { amount: 250, createdBy: 'user1', id: '02', name: 'Freelance' },
            ];
          },
        };
      },
    });
  };
```

### ❌ CÓDIGO INVENTADO (si NO aplicara el principio)

```typescript
import { AxiosClient } from '@lib/http/axios-client';  // ← Importa implementación concreta
import { API_BASE_URL } from '@config/environment';    // ← Acoplado a configuración

// ❌ Clase concreta en lugar de interfaz
export class IncomesQueriesService {
  private httpClient: AxiosClient;  // ← Acoplado a Axios específicamente

  constructor() {
    // ← Crea sus propias dependencias
    this.httpClient = new AxiosClient({
      baseURL: API_BASE_URL,
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async listIncomesByBudgetId(budgetId: string): Promise<Array<BasicIncomeDTO>> {
    // ← Acoplado a la estructura de respuesta de Axios
    const response = await this.httpClient.get(`/budgets/${budgetId}/incomes`);
    return response.data.incomes;  // ← Asume estructura específica
  }
}

// ← Exporta la clase concreta directamente
export const incomesQueries = new IncomesQueriesService();
```

### EXPLICACIÓN:

**✅ El código real:**
- Usa **interfaz abstracta** (`IncomesQueries`): el consumidor no conoce la implementación
- **Acoplamiento esencial**: solo depende del contrato (métodos y tipos de retorno)
- Fácil cambiar entre implementaciones: mock, API real, localStorage, sin tocar código consumidor
- Se puede cambiar de Axios a Fetch, GraphQL, gRPC sin modificar la interfaz

**❌ La versión mala:**
- **Acoplamiento accidental**: acoplado a Axios, configuración específica, estructura de respuesta
- Imposible usar mock sin instanciar todo el cliente HTTP
- Cambiar de Axios a Fetch requiere modificar todos los archivos que importan esta clase
- Dependencia transitiva: todo el que use esto también depende de Axios

---

## 4. INVERSIÓN DE DEPENDENCIAS

**Archivo**: `apps/tracker-spa/src/config/container/bearerAuthState.ts:42-56`

### ✅ CÓDIGO REAL DEL REPOSITORIO (aplica el principio)

```typescript
export interface BearerAuthState {
  isAuthenticated(): Promise<boolean>;
  getAccessToken(): Promise<string>;
  readonly expiresAt: Date;
}

export interface MockAuthBride {
  isAuth: boolean;
  bearerToken?: string;
}

if(import.meta.env.DEV)
  plugin.mock = (ctx: Ctx) => {
    ctx
      .bind('mockAuthBridgeClient', {
        scope: "singleton",
        provider() {
          return {
            isAuth: false,
            bearerToken: ''
          }
        }
      })
      .bind('bearerAuthState', {
        // ← Declara qué dependencias necesita
        resolveDependencies(ctx) {
          return ctx.get('mockAuthBridgeClient')  // ← El contenedor resuelve la dependencia
        },
        // ← Recibe la dependencia resuelta como parámetro
        provider(dep) {  // ← dep es MockAuthBride inyectado
          return {
            expiresAt: new Date(),
            async getAccessToken() {
              return dep.bearerToken ?? ''  // ← Usa la dependencia inyectada
            },
            async isAuthenticated() {
              return dep.isAuth  // ← Usa la dependencia inyectada
            },
          }
        }
    })
  }
```

### ❌ CÓDIGO INVENTADO (si NO aplicara el principio)

```typescript
import { MockAuthBridgeClient } from './mock-auth-client';  // ← Importa clase concreta

export interface BearerAuthState {
  isAuthenticated(): Promise<boolean>;
  getAccessToken(): Promise<string>;
  readonly expiresAt: Date;
}

// ❌ Implementación que crea sus propias dependencias
export class BearerAuthStateService implements BearerAuthState {
  private authClient: MockAuthBridgeClient;  // ← Acoplado a implementación concreta
  public expiresAt: Date;

  constructor() {
    // ❌ VIOLA Inversión de Dependencias: crea la dependencia con "new"
    this.authClient = new MockAuthBridgeClient({
      isAuth: false,
      bearerToken: ''
    });
    this.expiresAt = new Date();
  }

  async getAccessToken(): Promise<string> {
    return this.authClient.getToken();  // ← Usa la dependencia creada internamente
  }

  async isAuthenticated(): Promise<boolean> {
    return this.authClient.checkAuth();  // ← Usa la dependencia creada internamente
  }
}

// ← Módulo de alto nivel crea instancia de módulo de bajo nivel
export const bearerAuthState = new BearerAuthStateService();
```

### EXPLICACIÓN:

**✅ El código real:**
- **Depende de abstracciones**: recibe `MockAuthBride` como parámetro, no crea instancias
- **Inversión de control**: el contenedor (nivel superior) decide qué implementación inyectar
- Módulos de alto nivel (`bearerAuthState`) no dependen de módulos de bajo nivel (`mockAuthBridgeClient`)
- Fácil sustituir: en producción inyecta `RealAuthClient`, en tests inyecta otro mock

**❌ La versión mala:**
- **Viola inversión**: módulo de alto nivel (`BearerAuthStateService`) crea el módulo de bajo nivel con `new`
- Acoplamiento fuerte: imposible cambiar `MockAuthBridgeClient` sin modificar esta clase
- Difícil testear: no se puede inyectar un mock diferente
- Dependencia hardcodeada: `import` y `new` hacen que la dependencia sea fija

---

## 5. DEPENDENCY INJECTION

**Archivo**: `apps/tracker-spa/src/routes/(private)/(home)/-index/loader.ts:5-28`

### ✅ CÓDIGO REAL DEL REPOSITORIO (aplica el principio)

```typescript
export default async function homeLoader(
  // ← Inyección por parámetros: recibe los contenedores
  { globalContainer, budgetContainer }: { globalContainer: Ctx; budgetContainer: BudgetCtx },
  deps: { userName?: string; email?: string }
) {
  // ← Obtiene servicios del contenedor inyectado
  const user = globalContainer.get('user');
  const budgetQuery = budgetContainer.get('budgetQuery');

  const iconsByName = getIconsByName()

  // ← Usa los servicios inyectados
  const latestModified = budgetQuery
    .getLatestModified()
    .then(budgets => budgets.map(({ icon, ...rest }) => ({
      ...rest,
      icon: iconsByName[icon]({}),
      iconName: icon
    })));

  // ← Usa los servicios para obtener datos
  const [fullName, email] = await Promise.all([
    deps.userName ? Promise.resolve(deps.userName) : user.getFullName(),
    deps.email ? Promise.resolve(deps.email) : user.getEmail(),
  ]);

  return { fullName, email, latestModified };
}
```

### ❌ CÓDIGO INVENTADO (si NO aplicara el principio)

```typescript
import { createGlobalContainer } from '@config/container/global';  // ← Import directo
import { createBudgetContainer } from '../-config/container';      // ← Import directo
import { UserService } from '@services/user-service';              // ← Import de implementación
import { BudgetQueryService } from '@services/budget-query';       // ← Import de implementación

// ❌ Sin inyección: crea todas sus dependencias internamente
export default async function homeLoader(
  deps: { userName?: string; email?: string }
) {
  // ❌ Crea sus propias dependencias en lugar de recibirlas
  const globalContainer = createGlobalContainer();
  const budgetContainer = createBudgetContainer();

  // ❌ Instancia servicios directamente con "new"
  const user = new UserService();
  const budgetQuery = new BudgetQueryService();

  const iconsByName = getIconsByName()

  // ← Usa servicios hardcodeados
  const latestModified = budgetQuery
    .getLatestModified()
    .then(budgets => budgets.map(({ icon, ...rest }) => ({
      ...rest,
      icon: iconsByName[icon]({}),
      iconName: icon
    })));

  const [fullName, email] = await Promise.all([
    deps.userName ? Promise.resolve(deps.userName) : user.getFullName(),
    deps.email ? Promise.resolve(deps.email) : user.getEmail(),
  ]);

  return { fullName, email, latestModified };
}
```

### EXPLICACIÓN:

**✅ El código real:**
- **Inyección explícita**: recibe contenedores y servicios como parámetros
- No conoce cómo crear las dependencias: solo las usa
- Fácil testear: se pueden pasar contenedores mock con servicios stub
- Composición flexible: el llamador decide qué implementaciones usar (producción, dev, test)

**❌ La versión mala:**
- **Sin inyección**: crea todas sus dependencias con `new` o funciones factory
- Acoplamiento fuerte a implementaciones concretas (`UserService`, `BudgetQueryService`)
- Imposible testear: cada test crearía servicios reales con todas sus dependencias transitivas
- Difícil cambiar comportamiento: no se pueden sustituir implementaciones sin modificar el código

---

## Resumen de Patrones

| Principio | Concepto Clave | Ejemplo en el Repo |
|-----------|----------------|---------------------|
| **Ley de Demeter** | "No hables con extraños" - usa datos directos | Recibe `string` primitivos en lugar de objetos anidados |
| **Open/Close** | Extensible sin modificar - usa estrategias | Recibe `onSubmit` callback en lugar de switch/case |
| **Acoplamiento** | Depende de abstracciones, no implementaciones | Usa `interface IncomesQueries` en lugar de `class AxiosClient` |
| **Inversión de Dependencias** | Alto nivel no crea bajo nivel | `resolveDependencies` + `provider(dep)` en lugar de `new` |
| **Dependency Injection** | Recibe dependencias, no las crea | Parámetros `{ globalContainer, budgetContainer }` inyectados |

---

## Conclusión

Este repositorio muestra un **diseño maduro** con:

1. **Separación clara** entre abstracciones (interfaces) e implementaciones (providers)
2. **Inyección de dependencias** consistente usando un contenedor IoC
3. **Bajo acoplamiento** entre módulos gracias a interfaces y callbacks
4. **Alta testabilidad** porque todas las dependencias son inyectadas
5. **Extensibilidad** mediante patrones como Strategy y Plugin

Los ejemplos negativos inventados muestran los problemas típicos de código legacy: acoplamiento fuerte, dependencias hardcodeadas, y lógica de negocio mezclada con implementación.
