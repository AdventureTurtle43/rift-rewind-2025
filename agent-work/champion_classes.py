champions_data = """
Aatrox	Juggernaut
Ahri	Burst
Akali	Assassin
Akshan	Marksman and Assassin
Alistar	Vanguard
Ambessa	Diver and Skirmisher
Amumu	Vanguard
Anivia	Battlemage
Annie	Burst
Aphelios	Marksman
Ashe	Marksman
Aurelion Sol	Battlemage
Aurora	Burst and Assassin
Azir	Specialist
Bard	Catcher
Bel'Veth	Skirmisher
Blitzcrank	Catcher
Brand	Burst
Braum	Warden
Briar	Diver
Caitlyn	Marksman
Camille	Diver
Cassiopeia	Battlemage
Cho'Gath	Specialist
Corki	Marksman
Darius	Juggernaut
Diana	Assassin and Diver
Dr. Mundo	Juggernaut
Draven	Marksman
Ekko	Assassin
Elise	Diver
Evelynn	Assassin
Ezreal	Marksman
Fiddlesticks	Specialist
Fiora	Skirmisher
Fizz	Assassin
Galio	Warden
Gangplank	Specialist
Garen	Juggernaut
Gnar	Specialist
Gragas	Vanguard
Graves	Specialist
Gwen	Skirmisher
Hecarim	Diver
Heimerdinger	Specialist
Hwei	Artillery
Illaoi	Juggernaut
Irelia	Diver
Ivern	Catcher
Janna	Enchanter
Jarvan IV	Diver
Jax	Skirmisher
Jayce	Artillery
Jhin	Marksman and Catcher
Jinx	Marksman
K'Sante	Warden and Skirmisher
Kai'Sa	Marksman
Kalista	Marksman
Karma	Burst and Enchanter
Karthus	Battlemage
Kassadin	Assassin
Katarina	Assassin
Kayle	Specialist
Kayn	Skirmisher
Kennen	Specialist
Kha'Zix	Assassin
Kindred	Marksman
Kled	Skirmisher
Kog'Maw	Marksman
LeBlanc	Burst and Assassin
Lee Sin	Diver
Leona	Vanguard
Lillia	Skirmisher
Lissandra	Burst
Lucian	Marksman
Lulu	Enchanter
Lux	Burst and Artillery
Malphite	Vanguard
Malzahar	Battlemage
Maokai	Vanguard
Master Yi	Skirmisher
Mel	Artillery
Milio	Enchanter
Miss Fortune	Marksman
Mordekaiser	Juggernaut
Morgana	Catcher
Naafiri	Assassin
Nami	Enchanter
Nasus	Juggernaut
Nautilus	Vanguard
Neeko	Burst and Catcher
Nidalee	Specialist
Nilah	Skirmisher
Nocturne	Assassin
Nunu & Willump	Vanguard
Olaf	Diver
Orianna	Burst
Ornn	Vanguard
Pantheon	Diver
Poppy	Warden
Pyke	Assassin and Catcher
Qiyana	Assassin
Quinn	Specialist
Rakan	Catcher
Rammus	Vanguard
Rek'Sai	Diver
Rell	Vanguard
Renata Glasc	Enchanter
Renekton	Diver
Rengar	Assassin and Diver
Riven	Skirmisher
Rumble	Battlemage
Ryze	Battlemage
Samira	Marksman
Sejuani	Vanguard
Senna	Marksman and Enchanter
Seraphine	Burst and Enchanter
Sett	Juggernaut
Shaco	Assassin
Shen	Warden
Shyvana	Juggernaut
Singed	Specialist
Sion	Vanguard
Sivir	Marksman
Skarner	Vanguard and Juggernaut
Smolder	Marksman
Sona	Enchanter
Soraka	Enchanter
Swain	Battlemage
Sylas	Burst and Skirmisher
Syndra	Burst
Tahm Kench	Warden
Taliyah	Battlemage
Talon	Assassin
Taric	Enchanter and Warden
Teemo	Specialist
Thresh	Catcher
Tristana	Marksman
Trundle	Juggernaut
Tryndamere	Skirmisher
Twisted Fate	Burst
Twitch	Marksman
Udyr	Juggernaut
Urgot	Juggernaut
Varus	Marksman and Artillery
Vayne	Marksman
Veigar	Burst
Vel'Koz	Artillery
Vex	Burst
Vi	Diver
Viego	Skirmisher
Viktor	Battlemage
Vladimir	Battlemage
Volibear	Juggernaut
Warwick	Diver
Wukong	Diver
Xayah	Marksman
Xerath	Artillery
Xin Zhao	Diver
Yasuo	Skirmisher
Yone	Assassin and Skirmisher
Yorick	Juggernaut
Yunara	Marksman
Yuumi	Enchanter
Zac	Vanguard
Zed	Assassin
Zeri	Marksman
Ziggs	Artillery
Zilean	Specialist
Zoe	Burst
Zyra	Catcher
"""

# Generate formatted lines with "is a" between name and class
lines = []
for line in champions_data.strip().split("\n"):
    parts = line.split("\t")
    if len(parts) == 2:
        name, role = parts
        lines.append(f"{name} is a {role}")

print("\n".join(lines))