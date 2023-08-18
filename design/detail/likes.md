## いいね数取得
- routeは GET goals/:id/likes
- like_idの数を取得
- フロントに返す

## いいね追加
- routeは POST goals/:id/likes
- button onClickでAddLike発動
- アイコンは　https://fontawesome.com/icons/heart?f=classic&s=regular
- AddLikeでaxios.post goals/:id/likes する
  - paramsはuser_id, goal_id
- 送信した後にいいね数取得する

## いいね削除
- routeは DELETE likes/:like_id（goals/:id/likes/:like_idじゃなくていいらしい）
- button onClickでDeleteLike発動
 - paramsはlike_id
 - like_idを管理する方法は要検討（POST時にどこかで管理？）
 - いいね数取得
