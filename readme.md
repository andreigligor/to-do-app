# To Do App

Using ![html](https://badgen.net/badge/html/html/blue) ![css](https://badgen.net/badge/css/css/red) ![js](https://badgen.net/badge/js/js/yellow)

## Description 
A simple To Do App which allows user to keep track of their daily tasks. 
The user can add, edit and delete tasks and the data is saved into Local Storage. 
A dark-mode feature was added in order to reduce the glaring white light that may be distracting in the evenings.

The app was done using basic html, css and vanilla java script, trying to keep it simple and effective.

![light-mode](https://github.com/andreigligor/to-do-app/assets/119409240/851ce93d-1e17-40e9-8ae8-aab2c4113339)![dark-mode](https://github.com/andreigligor/to-do-app/assets/119409240/11cc5c68-4d98-432d-8459-c5b368386a10)

## Installation
The app is already deployed on Vercel: https://to-do-app-five-sandy.vercel.app/ and can be publicly accessed. 

## Usage
The app opens up with a pretty straight forward dashboard.</br>
* A new task can be added using the Add Your Task Here Section input form. Once the green plus button is pressed the task will be shown into the Your Tasks Go Here Section
* Once a task is done, it can be marked as completed using the check mark button associated with it, action which will trigger a green background for the task as well as the font being strikedout.
* A task can be edited by pressing the edit-pen button associated with it. An input form will open up where the task text could be modified. If the user changes his mind and wants to return to the main screen, the cancel orange button shoud be pressed. If any change is made to the task, it could be saved using the green check mark button.
* A task can be deleted using the delete cross button associated with it. These action will remove the task from the list.

All the operations are saved into Local Storage so event the page is refreshed or the browser is closed and then opened, the latest data is kept and shown to the user. Unfortunatelly if the computer is restarted the data is lost. This could be addressed by saving the data into an external database, but the purpose of this project was to use the Local Storage for saving the data. 

