# Capita1 — System Architecture, Financial Domain & Agent Skills

Este documento establece el contexto global, las directivas de arquitectura, la lógica de dominio financiero y los protocolos de ejecución obligatorios que el Agente de IA (Antigravity en VS Code) debe ejecutar sin excepción en cada interacción en este workspace.

---

## 1. ÁRBOL DEL WORKSPACE Y RESPONSABILIDADES

```text
capita1/
├── .antigravity/
│   └── rules.md                          # Contexto Maestro y Protocolos del Agente
├── docker-compose.yml                    # Orquestación de servicios locales (db, backend, frontend)
├── .env.example                          # Variables de entorno seguras (sin secretos expuestos)
│
├── backend/                              # BACKEND: FastAPI + SQLAlchemy 2.0 Async + asyncpg
│   ├── app/
│   │   ├── core/
│   │   │   ├── config.py                 # Settings tipados con Pydantic Settings
│   │   │   ├── database.py               # Engine asyncpg, AsyncSessionLocal y Base Declarativa
│   │   │   └── security.py               # Hashing bcrypt y generación/validación JWT en UTC
│   │   ├── modules/
│   │   │   ├── auth/                     # models.py, schemas.py, routes.py (Login, Registro, JWT)
│   │   │   ├── accounts/                 # models.py, schemas.py, routes.py (Bancos, Débito, Crédito)
│   │   │   ├── transactions/             # models.py, schemas.py, routes.py (Movimientos y Pagos)
│   │   │   ├── budgets/                  # models.py, schemas.py, routes.py (Presupuesto y Gastos Hormiga)
│   │   │   ├── debts/                    # models.py, schemas.py, routes.py (Créditos y Amortización)
│   │   │   ├── savings/                  # models.py, schemas.py, routes.py (Metas de Ahorro)
│   │   │   └── analytics/                # routes.py, services.py (Patrimonio Neto, KPIs y Balances)
│   │   └── main.py                       # Instancia FastAPI, CORS y registro de routers v1
│   ├── Dockerfile                        # Imagen Python 3.11-slim
│   ├── requirements.txt                  # Dependencias backend fijadas con versiones
│   └── alembic/                          # Migraciones de esquema en PostgreSQL
│
└── frontend/                             # FRONTEND: React 18+ Vite + Tailwind CSS
    ├── src/
    │   ├── assets/                       # Logotipos e identidades de plásticos bancarios
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── DecorativeDivider.jsx # Líneas de acento verticales (roja y azul punteadas)
    │   │   │   ├── AuthLines.jsx         # Líneas de acento horizontales (roja sup. y azul inf.)
    │   │   │   ├── AccountSidebar.jsx    # Sidebar con tarjeta activa y apartados interactivos
    │   │   │   └── AppLayout.jsx         # Contenedor shell maestro
    │   │   ├── accounts/
    │   │   │   ├── AccountEmptyState.jsx # Vista sin cuentas ("AGREGAR BANCO")
    │   │   │   ├── AccountGrid.jsx       # Selector de bancos registrados
    │   │   │   ├── AccountTypeModal.jsx  # Modal de bifurcación: Crédito vs Débito
    │   │   │   └── BankCard.jsx          # Componente visual de tarjeta (BBVA, Nu, Plata, Klar)
    │   │   ├── dashboard/
    │   │   │   ├── KpiGroup.jsx          # 3 tarjetas KPI superiores adaptativas
    │   │   │   ├── BudgetComparison.jsx  # Panel panorámico 1 (Presupuesto vs Real / Utilización)
    │   │   │   └── TransactionsTable.jsx # Panel panorámico 2 (Movimientos / Amortización)
    │   │   └── ui/
    │   │       ├── Button.jsx            # Botón píldora azul con borde rojo
    │   │       ├── Input.jsx             # Inputs redondeados de fondo blanco
    │   │       └── Modal.jsx             # Shell de modal oscuro
    │   │       └── LoginForm.jsx         # Inicio de sesión con autenticación JWT
    │   │       └── SigninForm.jsx        # Ingreso de nuevo usuario mediante correo, username y contraseña
    │   ├── hooks/
    │   │   └── useDebounce.js            # Optimización de búsquedas y filtros
    │   ├── lib/
    │   │   ├── formatters.js             # Formato monetario MXN y parsing de fechas UTC/Local
    │   │   └── utils.js                  # Helper cn (clsx + tailwind-merge)
    │   ├── services/
    │   │   ├── api.js                    # Fetch wrapper centralizado con auth token
    │   │   ├── authService.js            # Servicios de autenticación
    │   │   ├── accountService.js         # Servicios de cuentas y bancos
    │   │   └── transactionService.js     # Servicios de transacciones y presupuestos
    │   ├── App.jsx                       # Router principal y máquina de estados
    │   └── main.jsx                      # Entrada React
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 2. STACK TECNOLÓGICO Y CONVENCIONES

* **Backend:** Python 3.11+, FastAPI, SQLAlchemy 2.0 (modo asíncrono puro), `asyncpg`, PostgreSQL 16 local en Docker. Tablas en minúsculas y plural (`accounts`, `transactions`, `budgets`).
* **Precisión Numérica Financiera Obligatoria:**
  * **PROHIBIDO EL USO DE `float` O `double`:** Evitar pérdidas de precisión binaria en saldos o deudas.
  * En PostgreSQL / SQLAlchemy: Usar siempre `Numeric(14, 2)`.
  * En Python / Pydantic: Usar siempre `decimal.Decimal`.
  * En Frontend: El dinero se recibe y envía como string o número decimal estricto; para renderizado se utiliza exclusivamente la función centralizada de formato monetario.
* **Frontend:** React 18+ (Vite), Tailwind CSS con paleta Dark Mode absoluto (`#000000`), iconografía estándar con `lucide-react`.
* **Persistencia Local:** Los datos de PostgreSQL residen exclusivamente en el volumen persistente de Docker `postgres_data` montado sobre el SSD de la laptop anfitriona.

---

## 3. IDENTIDAD VISUAL Y DESIGN SYSTEM (FRONTEND)

* **Fondo Base:** Negro absoluto (`bg-black` / `#000000`) con tipografía blanca (`text-white`).
* **Líneas Divisorias de Acento (Guías de Marca):**
  * *En pantallas de autenticación (Login / Sign In):* Dos líneas horizontales punteadas (`border-t-2 border-dashed`), roja arriba (`border-red-600`) y azul abajo (`border-blue-600`).
  * *En pantallas internas (Bancos / Dashboard):* Dos líneas verticales punteadas (`border-r-2 border-dashed`), roja a la izquierda (`border-red-600`) y azul a la derecha (`border-blue-600`).
* **Botones de Acción Primaria:**
  * Estilo píldora (`rounded-full`), fondo azul rey (`bg-blue-600` hover `bg-blue-700`), tipografía en mayúsculas negrita (`font-extrabold text-white text-sm tracking-wider`), con borde perimetral rojo contrastante (`border-2 border-red-600`).
* **Inputs de Autenticación:**
  * Estilo píldora/redondeado (`rounded-full` o `rounded-2xl`), fondo blanco brillante (`bg-white`), texto negro legible (`text-black font-semibold`).
* **Contenedores y Tarjetas del Dashboard:**
  * Bordes redondeados pronunciados (`rounded-3xl`), fondo con degradado suave (`from-zinc-700/60 to-zinc-800/80`) y bordes sutiles (`border border-white/10`).
  * Grilla fija del Dashboard: 3 tarjetas KPI superiores de proporciones idénticas + 2 tarjetas panorámicas inferiores de ancho completo.
* **Plásticos Bancarios:**
  * Representación fidedigna de tarjetas: BBVA (verde azulado degradado), Nu (púrpura institucional), Plata (blanco/gris con acento naranja), Klar (verde menta con textura sutil).

---

## 4. MÁQUINA DE ESTADOS Y LÓGICA DE DOMINIO

### A. Flujo de Navegación del Usuario
El frontend debe implementar formalmente la siguiente máquina de estados:
1. `LOGIN` $\longleftrightarrow$ `SIGN_IN`
2. `ACCOUNT_EMPTY_STATE`: Se muestra tras el login si el usuario no tiene bancos registrados (`accounts.length === 0`), con el llamado a la acción "AGREGAR BANCO".
3. `ACCOUNT_LIST`: Rejilla con los plásticos bancarios registrados y botón inferior para añadir más entidades.
4. `ACCOUNT_TYPE_MODAL`: Al hacer clic sobre una tarjeta con soporte dual (ej. Nu o Klar), se abre la modal de selección con los botones independientes `Crédito` y `Débito`.
5. `DASHBOARD`: Se carga parametrizado por `accountId` y `accountType`.

### B. Lógica de Cuentas: Débito vs. Crédito
* **Cuenta de Débito (`DEBIT` - Activo / Liquidez):**
  * Representa dinero propio disponible (nómina, ahorro, efectivo).
  * KPIs superiores: 1. Saldo disponible actual | 2. Ingresos del mes (fijos vs. variables) | 3. Gastos totales (fijos vs. hormiga).
  * Paneles inferiores: Comparativa Presupuesto vs. Real por categorías y tabla de movimientos recientes.
  * Apartados del Sidebar: *Presupuesto*, *Transferencias*, *Categorías*, *Metas de Ahorro*.
* **Cuenta de Crédito (`CREDIT` - Pasivo / Financiamiento):**
  * Representa una línea de crédito revolvente.
  * KPIs superiores: 1. Deuda acumulada al periodo | 2. Línea disponible restante | 3. Porcentaje de uso ($\text{Uso} = \frac{\text{Deuda}}{\text{Línea}} \times 100$) y semáforo de riesgo (< 30% óptimo) con recordatorio de días para fecha de corte y fecha de pago.
  * Paneles inferiores: Desglose de compras revolventes vs. Meses sin Intereses (MSI) y simulador de liquidación (pago mínimo vs. pago para no generar intereses).
  * Apartados del Sidebar: *Estado de Cuenta*, *Cortes y Pagos*, *Meses sin Intereses*, *Simulador*.
* **Interconexión e Imputación Contable:**
  * Al realizar una compra con tarjeta de crédito, el gasto se imputa a la categoría correspondiente en la fecha de consumo y la deuda de la tarjeta aumenta.
  * El abono o pago a la tarjeta desde una cuenta de débito es una **Transferencia Interna (`CREDIT_CARD_PAYMENT`)**: resta saldo de la cuenta de débito y reduce la deuda en la cuenta de crédito. **Queda prohibido clasificarlo como gasto de consumo** para evitar duplicar el gasto en el presupuesto global.

### C. Módulos Financieros
* **Presupuesto y Gastos Hormiga:** Toda transacción de egreso admite las banderas `is_fixed` (gastos comprometidos indispensables) e `is_ant_expense` (gastos prescindibles no planificados). La UI debe calcular el acumulado mensual de gastos hormiga y emitir alertas visuales.
* **Metas de Ahorro:** Plazo en meses, monto objetivo y cálculo de la aportación mensual requerida considerando proyecciones con rendimiento anual.
* **Deudas y Créditos:** Registro de préstamos personales o hipotecas con su tabla de amortización, desglosando mensualidad en: abono a capital, pago de intereses y amortizaciones anticipadas.
* **Patrimonio Neto (Net Worth):** Cálculo consolidado en tiempo real según la fórmula:
  $$\text{Net Worth} = \sum(\text{Activos Fijos} + \text{Cuentas Débito/Ahorro} + \text{Inversiones}) - \sum(\text{Créditos} + \text{Deuda Tarjetas})$$

---

## 5. LOS 5 PILARES ARQUITECTÓNICOS OBLIGATORIOS

Antes de generar o modificar código en backend o frontend, el agente debe validar mentalmente el cumplimiento de estos 5 pilares:

### 1. Seguridad (Security by Design)
* **Aislamiento Multicuenta:** Cada consulta de lectura o escritura en base de datos debe validar obligatoriamente que `account.user_id == current_user.id`.
* **Protección de Datos Sensibles:** Bajo ninguna circunstancia solicitar o persistir números completos de tarjeta (PAN), fechas de vencimiento o códigos CVV. Almacenar únicamente los últimos 4 dígitos (`last4`), nombre del titular y alias institucional.
* **Sanitización de Cadenas:** Todo parámetro de texto recibido en la API debe limpiarse contra inyecciones de bytes nulos (`.replace("\x00", "").strip()`).
* **Cero Secretos Hardcodeados:** Prohibido escribir claves JWT, credenciales de PostgreSQL o configuraciones en el código. Consumir todo desde variables de entorno tipadas en `app/core/config.py`.

### 2. Escalabilidad y Flujo Histórico
* **Inmutabilidad de Periodos Cerrados:** Los registros de transacciones de meses históricos se mantienen congelados para auditoría; los reportes anuales se basan en balances consolidados sin recalcular meses cerrados repetidamente.
* **Cero Consultas N+1:** Prohibido resolver relaciones SQLAlchemy dentro de ciclos iterativos `for`. Utilizar siempre `selectinload` para relaciones uno-a-muchos (ej. `Account.transactions`, `Budget.items`) y `joinedload` para relaciones muchos-a-uno (ej. `Transaction.category`).
* **Paginación Defensiva:** Endpoints que retornen historiales de transacciones deben incluir soporte de paginación (`limit`, `offset`) con ordenamiento predeterminado `date DESC`.

### 3. Rapidez y Rendimiento (Sub-100ms Latency)
* **Índices en PostgreSQL:** Columnas utilizadas en filtros frecuentes (`user_id`, `account_id`, `category_id`, `date`, `is_ant_expense`) deben contar con índices B-Tree dedicados.
* **Agregaciones en DB:** Balances totales, sumatorias de gastos hormiga y promedios mensuales deben calcularse directamente en el motor relacional mediante `func.sum()` y `func.coalesce()`, evitando transferir listas completas de objetos a la memoria de Python o JavaScript.
* **Payloads Estrictos:** Los esquemas Pydantic de respuesta deben serializar únicamente los atributos requeridos por la vista activa.

### 4. Mantenibilidad (SOLID y Tipado Estricto)
* **Separación Estricta de Capas:**
  * `models.py`: Modelos declarativos físicos de SQLAlchemy y relaciones ORM.
  * `schemas.py`: DTOs tipados de entrada (`Create`, `Update`) y salida (`Response` con `model_config = ConfigDict(from_attributes=True)`).
  * `routes.py`: Controladores HTTP delgados que delegan la lógica de negocio y retornan esquemas tipados.
* **Tipado Defensivo:** Prohibido el uso de `Any`. Utilizar `Optional[T] = None` o uniones explícitas (`str | None`).
* **Modularidad en React:** Componentes reutilizables, hooks desacoplados y consumo centralizado de endpoints.

### 5. Disponibilidad y Resiliencia
* **Transaccionalidad Atómica:** Toda mutación que afecte balances o vincule dos cuentas (como un pago de tarjeta) debe ejecutarse dentro de un bloque seguro con `try...except` y `await session.rollback()` explícito ante errores.
* **Degradación Elegante:** En el frontend, las pantallas deben contar con estados de carga claros (`loading`) y captura de errores sin provocar pantallas blancas (*crashes*) ni cerrar la sesión ante caídas momentáneas de red.

---

## 6. AGENT SKILLS & PROTOCOLOS OPERATIVOS

### SKILL 1: Inspección y Sincronización de Contratos (DB ↔ API ↔ UI)
Antes de crear o modificar un endpoint o pantalla, valida la cadena completa:
1. Tabla física en PostgreSQL (tipos `Numeric(14, 2)`, `DateTime(timezone=True)`).
2. Modelo SQLAlchemy 2.0 Async (`models.py`).
3. Esquemas Pydantic v2 de entrada y salida (`schemas.py`).
4. Llamada HTTP en `services/*.js` y consumo en componentes React (`*.jsx`).

### SKILL 2: Rendimiento y Prevención de Consultas N+1
* Prohibido consultar relaciones en bucles. Usar `selectinload` o `joinedload`.
* Propiedades calculadas (ej. días restantes para corte o porcentaje de uso de tarjeta) deben calcularse en memoria o mediante propiedades híbridas antes de serializar.

### SKILL 3: Seguridad Defensiva y Aislamiento por Sesión
* Todo endpoint sensible debe requerir la dependencia: `current_user: User = Depends(get_current_user)`.
* Verificar siempre la propiedad de la cuenta: si `account.user_id != current_user.id`, retornar inmediatamente `HTTPException(status_code=403, detail="No autorizado para esta cuenta")`.

### SKILL 4: Transaccionalidad Atómica en Movimientos Financieros
Las operaciones monetarias deben ejecutarse bajo este estándar asíncrono:
```python
try:
    session.add(nueva_transaccion)
    # Ajuste de balances de la cuenta
    await session.commit()
    await session.refresh(cuenta_afectada)
except Exception as e:
    await session.rollback()
    raise HTTPException(status_code=500, detail=f"Fallo transaccional: {str(e)}")
```

### SKILL 5: Consistencia de Frontend, Moneda y Fechas
* **Formato de Moneda:** Utilizar siempre el formateador centralizado:
  ```javascript
  export const formatMoney = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
    }).format(amount || 0);
  };
  ```
* **Manejo de Fechas:** Las fechas se almacenan en la base de datos en UTC (`DateTime(timezone=True)`) y se formatean en el frontend considerando la zona horaria de México para evitar desplazamientos de día en fechas de corte y pago.

---

## 7. PROTOCOLO DE REVISIÓN TÉCNICA Y MODIFICACIÓN DE CÓDIGO (SINGLE-TURN)

El agente opera en un único turno de ejecución (*Single-Turn Execution*). En cada solicitud de modificación o desarrollo de código, estructurará su respuesta en tres fases:

### FASE 1: ANÁLISIS TÉCNICO PREVIO (Memoria descriptiva)
1. **Archivos Afectados:** Lista puntual de las rutas que serán creadas o modificadas.
2. **Justificación Técnica y Alternativas Descartadas:** Breve justificación (máximo 4-5 viñetas) explicando decisiones de arquitectura o sintaxis.
3. **Evaluación de Impacto en los 5 Pilares:** Mencionar en una sola viñeta los pilares arquitectónicos impactados directamente (*Seguridad, Escalabilidad, Rapidez, Mantenibilidad, Disponibilidad*).

### FASE 2: APLICACIÓN DIRECTA Y REVERSIBILIDAD
1. Aplicar las modificaciones directamente sobre los archivos mediante las herramientas del entorno.
2. Prohibido incluir datos hardcodeados, secretos o contraseñas en el código fuente.
3. Si el cambio requiere dependencias adicionales, actualizarlas en `requirements.txt` o `package.json`.
4. Proveer siempre el comando Git exacto para revertir la acción si el usuario lo requiere:
   - Archivo puntual: `git restore <ruta/al/archivo>`
   - Reversión total: `git restore .`

### FASE 3: VERIFICACIÓN AUTOMATIZADA Y SMOKE TESTS
Antes de dar por concluida la respuesta, el agente debe ejecutar las pruebas de verificación correspondientes:

1. **Verificación en Frontend (React / Vite):**
   ```bash
   cd frontend && pnpm build
   ```
   *Criterio:* La compilación debe finalizar estrictamente con exit code 0.

2. **Verificación en Backend (FastAPI / Python):**
   ```bash
   cd backend && python -m py_compile app/main.py && python -c "from app.main import app; assert len([r for r in app.routes if hasattr(r, 'methods')]) > 1, 'Error: Routers no registrados'"
   ```
   *Criterio:* Debe finalizar con exit code 0, garantizando ausencia de errores sintácticos, resolución correcta de imports y montaje efectivo de rutas.

3. **Bucle de Auto-Corrección Silencioso:**
   Si la verificación falla, el agente no debe detener la ejecución ni pedir confirmación al usuario; debe inspeccionar el error, corregir el archivo y volver a verificar (máximo 3 intentos internos antes de emitir un diagnóstico al usuario).

4. **Formato de Salida y Cierre:**
   Confirmar brevemente los archivos intervenidos, el éxito del build y el comando Git de reversión disponible.

---

## 8. ACCIÓN INICIAL DEL AGENTE AL INICIAR SESIÓN

Al iniciar una nueva sesión o conversación en este workspace, el agente debe:
1. Confirmar la lectura y adopción de este archivo de contexto (`.antigravity/rules.md`).
2. Indicar que el entorno de desarrollo se encuentra configurado bajo el estándar unificado de **Capita1**, preparado para operar con cuentas de **Débito**, **Crédito**, el modelo de **Digitt 2026** y los protocolos de verificación automatizada.