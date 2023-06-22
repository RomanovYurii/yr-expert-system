import _ from "lodash";

type Rule = {
  type: string;
  text: string;
  description: string | null;
};
type Rules = {
  [key: string]: {
    text: string;
    options?: Rule[];
    tip?: string;
    input?: {
      min: number;
      max?: number;
      description: string;
    }[];
  };
};

const POSITIVE_KEY = "POSITIVE_KEY";
const NEGATIVE_KEY = "NEGATIVE_KEY";
const NEUTRAL_KEY = "NEUTRAL_KEY";
const SPECIFIC_KEY = "SPECIFIC_KEY";

const positiveAnswer = (
  text: string,
  description: string | null = null
): Rule => ({
  type: POSITIVE_KEY,
  text,
  description,
});
const negativeAnswer = (
  text: string,
  description: string | null = null
): Rule => ({
  type: NEGATIVE_KEY,
  text,
  description,
});
const neutralAnswer = (
  text: string,
  description: string | null = null
): Rule => ({
  type: NEUTRAL_KEY,
  text,
  description,
});
const specificAnswer = (
  text: string,
  description: string | null = null
): Rule => ({
  type: SPECIFIC_KEY,
  text,
  description,
});

/** Questions start */
export const rules: Rules = {
  necessity: {
    text: "Do you need a computer?",
    options: [
      positiveAnswer("Yes"),
      negativeAnswer("No", "You probably don't need a computer"),
      neutralAnswer(
        "I don't know",
        "As far as you don't know if you really need a computer, make your decisions very carefully, because you may spend quite a lot of money for something that you don't really need and may not even use."
      ),
    ],
  },
  mobility: {
    text: "Do you plan to take your computer with you or do you only need it at home?",
    options: [
      positiveAnswer(
        "Yes, I will use it outside my home",
        "Stationary PC's are not originally made for transporting and don't possess a battery. Choosing them as a mobile option would rather be incorrect. Consider getting a laptop."
      ),
      negativeAnswer(
        "No, I need it only at home",
        "Even though a stationary PC is definitely more static device than a laptop, getting a laptop can also be an option depending on your planned usage and budget. Laptops are also good for stationary use in smaller rooms with smaller tables or even when there's no table in the room."
      ),
      neutralAnswer(
        "I don't know/I don't care",
        "It's always a big question what to choose between a stationary PC and a laptop. Maybe some further suggestions will help you to make a decision."
      ),
    ],
  },
  action_type: {
    text: "How would you rather use your computer?",
    options: [
      specificAnswer(
        "Work/Business",
        `For working purposes you usually don't need a powerful device.<br/><br/>My personal suggestion would be to buy a laptop, because it may be very efficient to have it around during the business trip or when taking some work to home.`
      ),
      specificAnswer("Gaming"),
      specificAnswer(
        "3D Design",
        "For 3D design you may need a powerful device. Rendering very detailed 3D images or even videos you need a really performant GPU. Also pay attention to an amount of RAM installed, because it may affect the speed of your working process."
      ),
      specificAnswer(
        "Casual usage",
        `For everyday usage you don't really need a powerful device. Usually even the cheapest models may work for you if you don't expect to watch an HD videos or playing video games.<br/><br/>It may be a common choice for students, who usually just watch some series on background and don't have special requirements.<br/>My own suggestion would be to get a laptop. It is usually cheaper, easier to repair, and you can watch series right in your bed!`
      ),
      neutralAnswer(
        "I don't know",
        "If you don't know what would you do with a computer, maybe you don't really need one? It may happen that your life is already going quite well without any computer and that's great!"
      ),
    ],
  },
  gaming_type: {
    text: "Do you want to play rather older games or more modern ones?",
    options: [
      specificAnswer(
        "Older ones",
        "For older games you usually don't need a powerful device. You may buy some used gaming laptops or try building your own computer from scratch, saving money by buying cheaper components"
      ),
      specificAnswer(
        "Newer ones",
        "You may need a really powerful device to play most recent games. If you are not about the best graphics quality you may save some money when choosing graphics card.<br/><br/>In general, you may need to check the latest or previous generations of graphics cards by NVIDIA or AMD for the bleeding edge gaming. Also, make sure that there's a modern (3-5 years old) model of CPU is installed in your device and that the amount of RAM is at least about 16Gb."
      ),
    ],
  },
  price: {
    text: "What amount of money you are ready to spend on new computer?",
    tip: "If you are not sure leave the value at 0",
    input: [
      {
        min: 0,
        max: 199,
        description:
          "If you're searching for a device with a price below $200, you'll need to be ready that you may need to lower your expectations of a future device capabilities. It doesn't mean that there are no such computers with this price or that they are necessarily bad. They just may be slower than more expensive models and sometimes you may get frustrated because of the speed it works with.",
      },
      {
        min: 200,
        max: 699,
        description:
          "The price between $200 and $750 is average for an average computer. It won't crack Pentagon's security in 1 hour, but it will work just well for browsing the internet, watching videos, playing older games or even a recent ones but on lower settings. There is a ton of offers for this price so you'll easily find the one you like.",
      },
      {
        min: 700,
        max: 1299,
        description:
          "The price between $700 and $1300 is of a better quality range. Devices with this price usually work really well in almost any case you wish. The most important thing in buying computers of this price range is to make sure that installed parts are compatible and more or less equivalent to each other in the matter of modernity. It may happen that some frauds may put an average CPU and RAM and make you pay just for a good GPU inside. Pay attention to this and search for a balanced setups.",
      },
      {
        min: 1300,
        description:
          "Prices above $1300 are of the highest category... at this particular moment. Never forget, that technologies develop constantly and something that's really top-tier right now may become pretty common very soon.<br/><br/>Nevertheless, devices of such price are usually very performant. They usually consist of most modern parts and may fulfill almost any desired action.<br/><br/>Also, they are really future-proof - having one of such devices guarantees you at least 5 years of a 100% performance in any tasks you desire, from business calculations to gaming on ultra settings and rendering 3D media.",
      },
    ],
  },
  customization: {
    text: "Do you want to update the components of your computer yourself?",
    options: [
      positiveAnswer(
        "Yes, I want to be able to modify my system as much as possible",
        "If you would like to be able to easily modify and upgrade your device it is definitely a point for the stationary PC. They provide almost complete access to inner parts with possibility to replace, change and upgrade them without an extra effort."
      ),
      negativeAnswer(
        "No, I just want to buy a computer and use it without dealing with the hardware",
        "It's completely fine to avoid tight contact with computer hardware. While stationary PCs are usually expected to be \"modifiable\" it is not a rule, and they may remain 100% stationary from the moment of installation.<br/><br/>However, laptops are way better in this sense, as far as they are being produced pre-built, meaning that you rather don't need to touch anything inside of them for a very long time. Some of them even have stickers of warranty, which prevent you from peeking inside.<br/><br/>Remember though, that any computer is it a station or a laptop require systematic care and cleaning, which you definitely may ask someone to do, but it needs to be done anyway."
      ),
      neutralAnswer(
        "I don't know/I don't care",
        "If you don't know whether you want to customize your device in the future, try to answer yourself: would you like just to buy another computer in future when this one will become outdated (it will) or you would rather just upgrade the parts of it?<br/><br/>For the first choice it is suggested to get a laptop. They are limited in upgrades and usually expected to be completely replaced, rather than upgraded part by part.<br/><br/>The second case is about stationary PC's that provide almost unlimited customization possibilities. However, be aware that upgrading PC parts is not always a simple action and may not only be challenging for people with less experience, but also may cause irreversible damage to the device!<br/><br/>This may not be an easy question, so make your decisions carefully"
      ),
    ],
  },
  os: {
    text: "Do you have any preferences for the OS?",
    options: [
      specificAnswer(
        "I would like it to run on MacOS",
        "Either you want to use an Apple ecosystem or you just like an idea of having Mac, remember that Apple devices usually cost significantly more than other devices and they have some specific limitations in their OS."
      ),
      specificAnswer(
        "I would like it to run on Unix-like system but not macOS",
        "If you want to have a UNIX-like system that is not a macOS you may probably buy a computer without any OS installed at all. UNIX-like systems are usually really lightweight and most of them are free, so you may just use some installation Flash-drive or another portable storage and install the system yourself.<br/><br/>Also, remember that UNIX-like systems are not the most popular across casual users, due to how these OS's work, so if you are not sure about what OS to choose, then you probably should look in macOS or Windows directions."
      ),
      specificAnswer(
        "I would like it to run on Windows",
        "Having Windows on a computer is a really common story. From running almost any modern game to having a user-friendly GUI and out-of-box utilities, it is a good choice for almost any occasion.<br/><br/>Before buying a computer, pay attention if the OS is installed and act accordingly. Be ready to set up and activate Windows at first load of your computer."
      ),
      neutralAnswer(
        "I don't know/I don't care",
        "Deciding over an OS is a tough question. There are not that many of them on the market, but they drastically differ from each other, so make sure that you are aware of at least basic usage scenarios for chosen OS before buying a computer with it installed.<br/><br/>If you are not familiar with specifics of selected OS avoid installing it from scratch on an empty device - this may be a challenging task for someone with prior to no experience in computers;"
      ),
    ],
  },
};

/** Questions end */

const p = (txt?: string | null) => (txt ? `<p>${txt}</p>` : "");
const b = (txt?: string | null) => (txt ? `<b>${txt}</b>` : "");
export const run = (facts: { [key: string]: any }) => {
  const result = [];

  Object.keys(facts).forEach((key) => {
    const fact = facts[key];
    let description;
    if (typeof fact === "string") {
      description = rules[key].options?.find(
        (option) => option.type === fact || option.text === fact
      )?.description;
    } else {
      description = rules[key].input?.find(
        (rule) => rule.min <= fact && (rule.max ? rule.max >= fact : true)
      )?.description;
    }
    if (description) {
      result.push(p(b(_.capitalize(key)) + ":<br/> " + description));
    }
  });

  result.push(
    p(
      "<hr>Summing up, it's really all about you and your desire. There are thousands of offers on the market with solutions to almost any request you have.<br/>Make your decision wisely and get yourself something that will help to make your life better and easier.<br/><br/>Good luck!"
    )
  );
  return result.filter((value) => value !== null).join("");
};
