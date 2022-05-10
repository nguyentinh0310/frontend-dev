export interface IMessage {
  _id: string;
  conversation: string;
  sender: string;
  recipient: string;
  text: string;
  media: string[];
  call: any;
}
