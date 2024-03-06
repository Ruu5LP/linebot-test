function doPost(e) {
  var replyToken= JSON.parse(e.postData.contents).events[0].replyToken;
  if (typeof replyToken === 'undefined') {
    return;
  }

  var url = 'https://api.line.me/v2/bot/message/reply';
  var channelToken = 'linebotのトークン';

  var messages = [{
    'type': 'text',
    'text': 'これはテストやで',
  }];
  debug(messages);

  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': messages,
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

function debug(value='デバッグテスト') {
  const sheet = SpreadsheetApp.openById('スプレッドシートID');
  const ss = sheet.getSheetByName('シートのタイトル');

  if (ss) {
    const date = new Date();
    const targetRow = ss.getLastRow() + 1;
    ss.getRange('A' + targetRow).setValue(date);
    ss.getRange('B' + targetRow).setValue(value);
  } else {
    Logger.log("シートのタイトルが見つかりません。");
  }
}
