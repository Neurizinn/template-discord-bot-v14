const { Client } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const config = require("../../config");

module.exports = class extends Client {
  constructor(options) {
    super(options);

    this.commands = [];
    this.loadEvents();
  }

  loadCommands(path = "src/commands") {
    try {
      const categories = readdirSync(path);

      for (const category of categories) {
        const commands = readdirSync(`${path}/${category}`);

        for (const command of commands) {
          const commandClass = require(join(
            process.cwd(),
            `${path}/${category}/${command}`
          ));

          const cmd = new commandClass(this);

          this.commands.push(cmd);
          console.log(`Comando ${cmd.name} carregado.`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  loadEvents(path = "src/events") {
    try {
      const categories = readdirSync(path);

      for (const category of categories) {
        const events = readdirSync(`${path}/${category}`);

        for (const event of events) {
          const eventClass = require(join(
            process.cwd(),
            `${path}/${category}/${event}`
          ));
          const evt = new eventClass(this);

          this.on(evt.name, evt.run);
        }
      }
      console.log("Eventos carregados com sucesso");
    } catch (error) {
      console.log(error);
    }
  }

  async registryCommands() {
    const guild = await this.guilds.cache.get(config.GUILD_ID);
    try {
      await guild.commands.set(this.commands);
      console.log("Comandos setados com sucesso");
    } catch (err) {
      console.log(`ERRO ENCONTRADO: ${err.message}`);
    }
  }
};