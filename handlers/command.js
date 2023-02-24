const fs = require("fs");

module.exports = (client) => {
    try {
        let comandos = 0;
        fs.readdirSync("./commands/").forEach((carpeta) => {
            const commands = fs.readdirSync(`./commands/${carpeta}`).filter((archivo) => archivo.endsWith(".js"))
            for (let archivo of commands){
                let comando = require(`../commands/${carpeta}/${archivo}`);
                if(comando.name) {
                    client.commands.set(comando.name, comando);
                    comando++
                } else {
                    console.log(`The command [/${carpeta}/${archivo}]`, `error =>  Command not configured`)
                    continue;
                }
                if(comando.aliases && Array.isArray(comando.aliases)) comando.aliases.forEach((alias) => client.aliases.set(alias, comando.name));
            }
        });
        console.log(`${comandos} commands were successfully loaded!`);
    } catch (e){
        console.log(e)
    }
}