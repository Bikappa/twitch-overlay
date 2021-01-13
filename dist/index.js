function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactJss = require('react-jss');

var useStyles = reactJss.createUseStyles({
  root: {
    backgroundColor: '#223322',
    padding: '20px',
    width: '400px',
    height: '400px',
    clipPath: 'polygon(0% 0%, 100% 0, 100% 76%, 49% 100%, 0 76%)',
    boxSizing: 'border-box'
  },
  innerBorder: {
    backgroundColor: '#CCFF00',
    padding: '6px',
    width: '360px',
    height: '360px',
    clipPath: 'polygon(0% 0%, 100% 0, 100% 76%, 49% 100%, 0 76%)',
    boxSizing: 'border-box'
  },
  inner: {
    backgroundColor: '#223322',
    padding: '20px',
    width: '348px',
    height: '348px',
    boxSizing: 'border-box',
    clipPath: 'polygon(0% 0%, 100% 0, 100% 76%, 49% 100%, 0 76%)',
    textAlign: 'center',
    color: 'white'
  },
  nickname: {
    textTransform: 'uppercase'
  }
});
function FollowerBadge(_ref) {
  var nickname = _ref.nickname;
  var styles = useStyles();
  return React__default.createElement("div", {
    className: styles.root
  }, React__default.createElement("div", {
    className: styles.innerBorder
  }, React__default.createElement("div", {
    className: styles.inner
  }, React__default.createElement("span", null, "Nuovo follower"), React__default.createElement("h2", {
    className: styles.nickname
  }, nickname))));
}

var Overlay = function Overlay() {
  var _useState = React.useState(undefined),
      newFollower = _useState[0],
      setNewFollower = _useState[1];

  var handlers = {
    follower: function follower(event) {
      setNewFollower(event.name);
    }
  };
  React.useEffect(function () {
    var chatEventHandler = function chatEventHandler(e) {
      var obj = e;

      if (!obj.detail.event) {
        return;
      }

      var _obj$detail$listener$ = obj.detail.listener.split('-'),
          listener = _obj$detail$listener$[0];

      var event = obj.detail.event;
      var handler = handlers[listener];

      if (handler) {
        handler(event);
      }
    };

    window.addEventListener('onEventReceived', chatEventHandler);
    return function () {
      window.removeEventListener('onEventReceived', chatEventHandler);
    };
  });
  React.useEffect(function () {
    if (!newFollower) {
      return;
    }

    var timeout = setTimeout(function () {
      return setNewFollower(undefined);
    }, 2500);
    return function () {
      clearTimeout(timeout);
    };
  }, [newFollower]);
  return React__default.createElement("div", null, React__default.createElement("span", null, "Follower"), newFollower ? React__default.createElement(FollowerBadge, {
    nickname: newFollower
  }) : null);
};

exports.Overlay = Overlay;
//# sourceMappingURL=index.js.map
