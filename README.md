# Temas puntuales

## Seccion 4 - Profundizando Hooks y React

Esta sección tiene por objetivo reforzar el conocimiento de los hooks tradicionales y especializarlos en los "custom hooks"

Puntualmente veremos:

- useState
- useRef
- useEffect
- Custom Hooks como:
   1. useCounter
   2. usePokemon
   3. useTrafficLight
- Conectar múltiples custom hooks entre sí

Y mucho más..

### Cuestionario

1. Cual es la principal diferencia entre usar useState y useRef para almacenar un valor en un componente de React?
- Respuesta: Cambiar unvalor con la funcion de useState provoca un nuevo renderizado del componente, mientras que cambiar
la propiedad .current de una referencia creada con useRef no provoca un nuevo renderizado.
- Dato: useState esta diseñado para manejar datos que, al cambiar, deben reflejarse en la UI, por lo que dispara un re-render,
useRef es para mantener datos que no deben causar una actualización de la UI cuando cambian.

2. Al utilizar useEffect para manejar suscripciones o temporizadores (como un setInterval), cual es el proposito fundamental
de la funcion de limpieza (cleanup function) que se retorna desde el hook?
- Respuesta: La funcion de limpieza se utiliza para limpiar o cancelar cualquier suscripcion, temporizador u otro efecto secundario
que se haya configurado en el efecto principal.
- Dato: Esto ayuda a prevenir fugas de memoria y comportamientos inesperados cuando el componente se desmonta o cuando el efecto se vuelve a ejecutar.

3. Cual es el beneficio principal de extraer la logica de un componente a un custom hook en React?
- Respuesta: Separar responsabildiades (logica vs presentacion), hacer el codigo mas reutilizable y mantener los componentes mas limpios y declarativos. El beneficio principal es la reutilizacion de logica entre multiples componentes, lo que mejora la mantenibilidad
y la organizacion del codigo.
- Dato: Los custom hooks son la herramienta principal en React para empaquetar y reutilizar logica con estado. Esto permite que los componentes se enfoquen en como se ve la UI, mientras que la logica compleja vive en el hook, logrando asi ser usados en multiples componentes.

4. Verdadero o False: Segun las buenas practicas, es preferible tener un unico y gran useEffect que maneje todas las logicas de un componente, en lugar de varios useEffect mas pequenos y especializados.
- Respuesta: Falso
- Dato: Es preferible tener varios useEffect pequenos y especializados, cada uno manejando una tarea o efecto especifico. Esto mejora la legibilidad y el mantenimiento del codigo, ya que cada efecto es mas facil de entender y modificar sin afectar otros efectos.

5. Por que es buena practica en TypeScript especificar un tipo generico a useState (ej. useState<TrafficLights>('red')) en lugar de dejar que TypeScript infiera el tipo automaticamente?
- Respuesta: Para restringir los posibles valores del estado a un conjunto predefinido, evitando errores al asignar valores invalidos y obtener mejor autocompletado y validacion de tipos durante el desarrollo.
- Dato: Al especificar un tipo generico, se mejora la seguridad de tipos y se evita que se asignen valores incorrectos al estado, lo que puede llevar a errores en tiempo de ejecucion.

6. Por que no se puede declarar la funcion callback de un useEffect directamente como async? (ej. useEffect(async () => { ... }))
- Porque useEffect espera que el callback retorne opcionalmente una funcion de limpieza, pero una funcion async siempre retorna una Promesa, rompiendo asi el contrato del hook.
- Dato: Una funcion declarada como async envuelve implicitamente su retorno en una Promesa, useEffect, sin embargo, requiere que el valor de retorno sea una funcion (para la limpieza) o undefined. Al retornar una promesa se viola esta regla. La forma correcta es definir una funcion async dentro del efecto y llamarla.

7. (Basado en el ejemplo de PokemonPage) Como se logra la comunicacion entre el `useCounter` y el `usePokemon`?
- Respuesta: El componente PokemonPage actua como intermediario, obtiene el valor `counter` del `useCounter` y se lo pasa como argumento `id` al `usePokemon` durante el renderizado.
- Dato: Esta tecnica de "lifting state up" permite que multiples custom hooks compartan informacion a traves del componente padre, facilitando la composicion y reutilizacion de logica entre diferentes partes de la aplicacion.

8. Al crear un custom hook cual es la ventaja de exponer "propiedades computadas" (ej. un `percentage` ya calculado o una `formatedId`) en lugar de solo los datos crudos del estado?
- Respuesa: Mantiene a los componentes que usan el hook mas simples y enfocados en la presentacion, ya que la logica de calculo y formato se encapsula y centraliza dentro del hook.
- Dato: Al proporcionar propiedades computadas, se reduce la duplicacion de logica en los componentes consumidores, promoviendo la reutilizacion y facilitando el mantenimiento del codigo. Separacion de responsabilidades.

9. La funcion para actualizar un estado de useState (ej. setCount) puede recibir un nuevo valor directamente. Que otra cosa puede recibir y par que es util?
- Respuesta: Puede recibir una funcion callback que tiene como argumento el valor actual del estado. Es util cuando el nuevo estado depende del valor previo.
- Dato: Esta forma de actualizar el estado es especialmente util en escenarios asincronicos o cuando hay multiples actualizaciones de estado en cola, ya que garantiza que siempre se trabaje con el valor mas reciente del estado.

10. Verdadero o Falso: Si en modo de desarrollo (React.StrictMode) un console.log dentro de un useEffect aparece 2 veces en la consola, significa que hay un error en el codigo que causara una doble ejecucion en produccion.
- Respuesta: Falso
- Dato: En modo de desarrollo, React.StrictMode intencionalmente monta, desmonta y vuelve a montar los componentes para ayudar a identificar efectos secundarios no deseados. Esto puede causar que los efectos se ejecuten dos veces, pero en produccion esto no ocurre.
---
