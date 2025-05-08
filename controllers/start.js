const { inlineKeyboard, button } = require("telegraf/markup");
const { bot } = require("../core/bot");

// Botni i shga tushirish
bot.start((ctx) => {

  ctx.replyWithHTML(
    `Assalamu alaykum va rohmatulloh! <b>${ctx.message.from.first_name}</b> \n
Man guruhdagi yangi a'zolarni kirdi-chiqdi malumotlarini arxivdan tozalab turaman🙂
\nMeni ishlashim uchun guruhingizga admin qilishingiz kerak! 😀
\nAlloh taollo hamkorligimizni xayrli qilsin! 🤝`,
    inlineKeyboard([
      button.url("➕ GURUHGA QO'SHISH", "https://t.me/Kirdichiqdi_tozalaydiganbot?startgroup=start"),
    ])
  );
});

// Guruhga yangi a'zo qo'shilganda o'chirish
bot.on("new_chat_members", async (ctx) => {
  const newMembers = ctx.message.new_chat_members;

  for (const member of newMembers) {
    try {
      await ctx.deleteMessage(member.message_id);
    } catch (error) {
      console.error("❌ Xabarni o'chirishda xato:", error);
    }
  }
});

// Guruhdan a'zo chiqib ketganda o'chirish
bot.on("left_chat_member", async (ctx) => {
  const leftMember = ctx.message.left_chat_member;

  try {
    await ctx.deleteMessage(leftMember.message_id);
  } catch (error) {
    console.error("❌ Xabarni o'chirishda xato:", error);
  }
});

// Errorlarni ushlab turish
bot.on("polling_error", (error) => {
  console.error(error);
});

bot.launch();
