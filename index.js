const { app, BrowserWindow, ipcMain } = require("electron")
const path = require('path');
const url = require('url');

var knex = require('knex')({
	client: 'pg',
	version: '7.2',
	connection: {
	  host : 'lnx1546.ch3.dev.i.com',
	  user : "opsbld_iri_d1",
	  password : 'dRbTZ7Ou',
	  database : 'db_warehouse_dev_01'
	}
  });

app.on("ready", () => {
	let mainWindow = new BrowserWindow({ height: 1109, width: 1109, show: false })
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'main.html'),
		protocol: 'file',
		slashes: true
	}));
	mainWindow.once("ready-to-show", () => { mainWindow.show() })

	ipcMain.on("mainWindowLoaded", function () {
		let result = knex.select("title").from("books")
		result.then(function(rows){
			mainWindow.webContents.send("resultSent", rows);
		})
	});
});



app.on("window-all-closed", () => { app.quit() })
