App Structure
-------------

● src
+---● actions
|   |
|   |-- api.js (handle all http request)
|   |-- postMessage.js (Redux actions & action creators) 
|   |-- store.js (configure redux store)
|
+---● components
|   |
|   |--PostMessageForm.js (form operations) - child
|   |--PostMessages.js  (list of records) - parent
|   |--useForm.js (handles common form opearations)
|
|---● reducers
|   |
|   |--postMessage.js
|   |--index.js
|
|-- App.js
|-- index.js
|-- index.css