var Utility;
(function (Utility) {
    function log(msg) {
        console.log(msg);
    }
    Utility.log = log;
    function error(error) {
        console.error(error);
    }
    Utility.error = error;
    var Messaging;
    (function (Messaging) {
        function getMsg() {
            return 'hello';
        }
        Messaging.getMsg = getMsg;
    })(Messaging = Utility.Messaging || (Utility.Messaging = {}));
})(Utility || (Utility = {}));
Utility.log(Utility.Messaging.getMsg());
Utility.error('Oh, no!');
