namespace Utility {
  export function log(msg: any) {
    console.log(msg);
  }

  export function error(error) {
    console.error(error);
  }

  export namespace Messaging {
    export function getMsg() {
      return 'hello';
    }
  }
}

Utility.log(Utility.Messaging.getMsg());
Utility.error('Oh, no!');
