CONFIGURACIONES EN PRETTIER:
Cando necesite configurar algunas cosas de la extensión Prettier, lo mejor va a ser que haga un archivo ".prettierrc" para escribir el código con lo que necesite cambiar.

\*\* Por ejemplo cambiar las comillas dobles (") por comillas simples (') escribimos el siguiente código:

{
"singleQuote": true  
}

\*\* Otro ejemplo: en Arrow Functions cuando tenemos 1 solo parámetro, queremos verlo sin paréntesis:

"arrowParens": "avoid" --> escribimos este código abajo del single cuote y listo.

///////////////////////////////////////////////////////////
CONFIGURACIÓN "Florencia.code-snippets":
\*\* Atajo para escribir "console.log()"  
{
"Print to console": {
"scope": "javascript,typescript",
"prefix": "cl",
"body": [
"console.log();"],
"description": "Log output to console"
}
}
Con este código lo que logramos es que cada vez que escriba "cl" en Visual Studio, se entienda que quiero escribir "console.log()" y el programa lo autocomplete por mí.
De esta manera evitamos perder mucho tiempo tipeando.

/////////////////////////////////////////////////////////
CONFIGURACION SETTINGS JSON:
El siguiente código se escribió en el archivo "settings.json" al cual podemos acceder desde: Code -> Settings -> Settings -> y apretamos el ícono del papelito (Open Settings Json) que está en la parte superior derecha.

"todohighlight.isCaseSensitive": true,
"todohighlight.keywords": [
{
"text": "VIDEO",
"color": "#333",
"backgroundColor": "#3498db"
},
{
"text": "FIXME",
"color": "#333",
"backgroundColor": "#e67e22"
},
{
"text": "BUG",
"color": "#333",
"backgroundColor": "#e74c3c"
},
{
"text": "TODO",
"color": "#333",
"backgroundColor": "#2ecc71"
}
{
"text": "***",
"color": "#333",
"backgroundColor": "#da77f2"
}
]

Esto lo que hace es que cada vez que escribamos el texto, por ejemplo "TODO" el programa lo resalte en verde.
