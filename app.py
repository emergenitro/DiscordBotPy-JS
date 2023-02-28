import discord
from discord import app_commands
from dotenv import load_dotenv
import os

load_dotenv()

Token = os.getenv("bot_token")


class aClient(discord.Client):
    def __init__(self):
        super().__init__(intents=discord.Intents.default())
        self.synced = False

    async def on_ready(self):
        await self.wait_until_ready()
        if not self.synced:
            await tree.sync()
            self.synced = True
        print(f"Logged in as {self.user}")


client = aClient()
tree = app_commands.CommandTree(client)


@tree.command(name="test", description="testing everything")
async def self(interaction: discord.Interaction, name: str):
    await interaction.response.send_message(f"Hello {name}")

client.run(Token)
