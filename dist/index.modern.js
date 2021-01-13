import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

var useStyles = createUseStyles({
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
  return React.createElement("div", {
    className: styles.root
  }, React.createElement("div", {
    className: styles.innerBorder
  }, React.createElement("div", {
    className: styles.inner
  }, React.createElement("span", null, "Nuovo follower"), React.createElement("h2", {
    className: styles.nickname
  }, nickname))));
}

var Overlay = function Overlay() {
  var _useState = useState(undefined),
      newFollower = _useState[0],
      setNewFollower = _useState[1];

  var handlers = {
    follower: function follower(event) {
      setNewFollower(event.name);
    }
  };
  useEffect(function () {
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
  useEffect(function () {
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
  return React.createElement("div", null, React.createElement("span", null, "Follower"), newFollower ? React.createElement(FollowerBadge, {
    nickname: newFollower
  }) : null);
};

export { Overlay };
//# sourceMappingURL=index.modern.js.map
