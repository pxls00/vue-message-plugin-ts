import { effectScope as De, ref as B, markRaw as I, toRaw as W, isRef as x, isReactive as te, toRef as q, getCurrentInstance as nt, inject as st, watch as ke, unref as V, reactive as ot, nextTick as we, computed as je, getCurrentScope as rt, onScopeDispose as it, toRefs as Se, defineComponent as ne, openBlock as $, createElementBlock as R, normalizeClass as z, createElementVNode as re, renderSlot as H, toDisplayString as ie, createTextVNode as Oe, createCommentVNode as Ce, createBlock as ae, TransitionGroup as at, withCtx as ce, createSlots as Ne, renderList as le, Fragment as ct } from "vue";
var Le = !1;
function Y(e, s, t) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, s), e.splice(s, 1, t), t) : (e[s] = t, t);
}
function ue(e, s) {
  if (Array.isArray(e)) {
    e.splice(s, 1);
    return;
  }
  delete e[s];
}
function lt() {
  return xe().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function xe() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const ut = typeof Proxy == "function", ft = "devtools-plugin:setup", dt = "plugin:settings:set";
let j, de;
function gt() {
  var e;
  return j !== void 0 || (typeof window < "u" && window.performance ? (j = !0, de = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (j = !0, de = global.perf_hooks.performance) : j = !1), j;
}
function mt() {
  return gt() ? de.now() : Date.now();
}
class pt {
  constructor(s, t) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = s, this.hook = t;
    const n = {};
    if (s.settings)
      for (const r in s.settings) {
        const i = s.settings[r];
        n[r] = i.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${s.id}`;
    let a = Object.assign({}, n);
    try {
      const r = localStorage.getItem(o), i = JSON.parse(r);
      Object.assign(a, i);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return a;
      },
      setSettings(r) {
        try {
          localStorage.setItem(o, JSON.stringify(r));
        } catch {
        }
        a = r;
      },
      now() {
        return mt();
      }
    }, t && t.on(dt, (r, i) => {
      r === this.plugin.id && this.fallbacks.setSettings(i);
    }), this.proxiedOn = new Proxy({}, {
      get: (r, i) => this.target ? this.target.on[i] : (...u) => {
        this.onQueue.push({
          method: i,
          args: u
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (r, i) => this.target ? this.target[i] : i === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(i) ? (...u) => (this.targetQueue.push({
        method: i,
        args: u,
        resolve: () => {
        }
      }), this.fallbacks[i](...u)) : (...u) => new Promise((d) => {
        this.targetQueue.push({
          method: i,
          args: u,
          resolve: d
        });
      })
    });
  }
  async setRealTarget(s) {
    this.target = s;
    for (const t of this.onQueue)
      this.target.on[t.method](...t.args);
    for (const t of this.targetQueue)
      t.resolve(await this.target[t.method](...t.args));
  }
}
function Me(e, s) {
  const t = e, n = xe(), o = lt(), a = ut && t.enableEarlyProxy;
  if (o && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    o.emit(ft, e, s);
  else {
    const r = a ? new pt(t, o) : null;
    (n.__VUE_DEVTOOLS_PLUGINS__ = n.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: t,
      setupFn: s,
      proxy: r
    }), r && s(r.proxiedTarget);
  }
}
/*!
  * pinia v2.0.33
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let F;
const J = (e) => F = e, Ue = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function D(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var O;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(O || (O = {}));
const se = typeof window < "u", G = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && se, Ie = /* @__PURE__ */ (() => typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null })();
function _t(e, { autoBom: s = !1 } = {}) {
  return s && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e], { type: e.type }) : e;
}
function _e(e, s, t) {
  const n = new XMLHttpRequest();
  n.open("GET", e), n.responseType = "blob", n.onload = function() {
    He(n.response, s, t);
  }, n.onerror = function() {
    console.error("could not download file");
  }, n.send();
}
function Re(e) {
  const s = new XMLHttpRequest();
  s.open("HEAD", e, !1);
  try {
    s.send();
  } catch {
  }
  return s.status >= 200 && s.status <= 299;
}
function X(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const t = document.createEvent("MouseEvents");
    t.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(t);
  }
}
const Z = typeof navigator == "object" ? navigator : { userAgent: "" }, Fe = /* @__PURE__ */ (() => /Macintosh/.test(Z.userAgent) && /AppleWebKit/.test(Z.userAgent) && !/Safari/.test(Z.userAgent))(), He = se ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Fe ? ht : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in Z ? yt : (
      // Fallback to using FileReader and a popup
      vt
    )
  )
) : () => {
};
function ht(e, s = "download", t) {
  const n = document.createElement("a");
  n.download = s, n.rel = "noopener", typeof e == "string" ? (n.href = e, n.origin !== location.origin ? Re(n.href) ? _e(e, s, t) : (n.target = "_blank", X(n)) : X(n)) : (n.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(n.href);
  }, 4e4), setTimeout(function() {
    X(n);
  }, 0));
}
function yt(e, s = "download", t) {
  if (typeof e == "string")
    if (Re(e))
      _e(e, s, t);
    else {
      const n = document.createElement("a");
      n.href = e, n.target = "_blank", setTimeout(function() {
        X(n);
      });
    }
  else
    navigator.msSaveOrOpenBlob(_t(e, t), s);
}
function vt(e, s, t, n) {
  if (n = n || open("", "_blank"), n && (n.document.title = n.document.body.innerText = "downloading..."), typeof e == "string")
    return _e(e, s, t);
  const o = e.type === "application/octet-stream", a = /constructor/i.test(String(Ie.HTMLElement)) || "safari" in Ie, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || o && a || Fe) && typeof FileReader < "u") {
    const i = new FileReader();
    i.onloadend = function() {
      let u = i.result;
      if (typeof u != "string")
        throw n = null, new Error("Wrong reader.result type");
      u = r ? u : u.replace(/^data:[^;]*;/, "data:attachment/file;"), n ? n.location.href = u : location.assign(u), n = null;
    }, i.readAsDataURL(e);
  } else {
    const i = URL.createObjectURL(e);
    n ? n.location.assign(i) : location.href = i, n = null, setTimeout(function() {
      URL.revokeObjectURL(i);
    }, 4e4);
  }
}
function _(e, s) {
  const t = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(t, s) : s === "error" ? console.error(t) : s === "warn" ? console.warn(t) : console.log(t);
}
function he(e) {
  return "_a" in e && "install" in e;
}
function Ge() {
  if (!("clipboard" in navigator))
    return _("Your browser doesn't support the Clipboard API", "error"), !0;
}
function Be(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (_('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function bt(e) {
  if (!Ge())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), _("Global state copied to clipboard.");
    } catch (s) {
      if (Be(s))
        return;
      _("Failed to serialize the state. Check the console for more details.", "error"), console.error(s);
    }
}
async function Et(e) {
  if (!Ge())
    try {
      e.state.value = JSON.parse(await navigator.clipboard.readText()), _("Global state pasted from clipboard.");
    } catch (s) {
      if (Be(s))
        return;
      _("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(s);
    }
}
async function wt(e) {
  try {
    He(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (s) {
    _("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(s);
  }
}
let N;
function St() {
  N || (N = document.createElement("input"), N.type = "file", N.accept = ".json");
  function e() {
    return new Promise((s, t) => {
      N.onchange = async () => {
        const n = N.files;
        if (!n)
          return s(null);
        const o = n.item(0);
        return s(o ? { text: await o.text(), file: o } : null);
      }, N.oncancel = () => s(null), N.onerror = t, N.click();
    });
  }
  return e;
}
async function Ot(e) {
  try {
    const t = await (await St())();
    if (!t)
      return;
    const { text: n, file: o } = t;
    e.state.value = JSON.parse(n), _(`Global state imported from "${o.name}".`);
  } catch (s) {
    _("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(s);
  }
}
function w(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const Je = "🍍 Pinia (root)", ge = "_root";
function Nt(e) {
  return he(e) ? {
    id: ge,
    label: Je
  } : {
    id: e.$id,
    label: e.$id
  };
}
function It(e) {
  if (he(e)) {
    const t = Array.from(e._s.keys()), n = e._s;
    return {
      state: t.map((a) => ({
        editable: !0,
        key: a,
        value: e.state.value[a]
      })),
      getters: t.filter((a) => n.get(a)._getters).map((a) => {
        const r = n.get(a);
        return {
          editable: !1,
          key: a,
          value: r._getters.reduce((i, u) => (i[u] = r[u], i), {})
        };
      })
    };
  }
  const s = {
    state: Object.keys(e.$state).map((t) => ({
      editable: !0,
      key: t,
      value: e.$state[t]
    }))
  };
  return e._getters && e._getters.length && (s.getters = e._getters.map((t) => ({
    editable: !1,
    key: t,
    value: e[t]
  }))), e._customProperties.size && (s.customProperties = Array.from(e._customProperties).map((t) => ({
    editable: !0,
    key: t,
    value: e[t]
  }))), s;
}
function Pt(e) {
  return e ? Array.isArray(e) ? e.reduce((s, t) => (s.keys.push(t.key), s.operations.push(t.type), s.oldValue[t.key] = t.oldValue, s.newValue[t.key] = t.newValue, s), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: w(e.type),
    key: w(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function $t(e) {
  switch (e) {
    case O.direct:
      return "mutation";
    case O.patchFunction:
      return "$patch";
    case O.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let L = !0;
const K = [], T = "pinia:mutations", h = "pinia", { assign: Tt } = Object, ee = (e) => "🍍 " + e;
function At(e, s) {
  Me({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: K,
    app: e
  }, (t) => {
    typeof t.now != "function" && _("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), t.addTimelineLayer({
      id: T,
      label: "Pinia 🍍",
      color: 15064968
    }), t.addInspector({
      id: h,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            bt(s);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Et(s), t.sendInspectorTree(h), t.sendInspectorState(h);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            wt(s);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Ot(s), t.sendInspectorTree(h), t.sendInspectorState(h);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: "Reset the state (option store only)",
          action: (n) => {
            const o = s._s.get(n);
            o ? o._isOptionsAPI ? (o.$reset(), _(`Store "${n}" reset.`)) : _(`Cannot reset "${n}" store because it's a setup store.`, "warn") : _(`Cannot reset "${n}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), t.on.inspectComponent((n, o) => {
      const a = n.componentInstance && n.componentInstance.proxy;
      if (a && a._pStores) {
        const r = n.componentInstance.proxy._pStores;
        Object.values(r).forEach((i) => {
          n.instanceData.state.push({
            type: ee(i.$id),
            key: "state",
            editable: !0,
            value: i._isOptionsAPI ? {
              _custom: {
                value: W(i.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => i.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(i.$state).reduce((u, d) => (u[d] = i.$state[d], u), {})
            )
          }), i._getters && i._getters.length && n.instanceData.state.push({
            type: ee(i.$id),
            key: "getters",
            editable: !1,
            value: i._getters.reduce((u, d) => {
              try {
                u[d] = i[d];
              } catch (m) {
                u[d] = m;
              }
              return u;
            }, {})
          });
        });
      }
    }), t.on.getInspectorTree((n) => {
      if (n.app === e && n.inspectorId === h) {
        let o = [s];
        o = o.concat(Array.from(s._s.values())), n.rootNodes = (n.filter ? o.filter((a) => "$id" in a ? a.$id.toLowerCase().includes(n.filter.toLowerCase()) : Je.toLowerCase().includes(n.filter.toLowerCase())) : o).map(Nt);
      }
    }), t.on.getInspectorState((n) => {
      if (n.app === e && n.inspectorId === h) {
        const o = n.nodeId === ge ? s : s._s.get(n.nodeId);
        if (!o)
          return;
        o && (n.state = It(o));
      }
    }), t.on.editInspectorState((n, o) => {
      if (n.app === e && n.inspectorId === h) {
        const a = n.nodeId === ge ? s : s._s.get(n.nodeId);
        if (!a)
          return _(`store "${n.nodeId}" not found`, "error");
        const { path: r } = n;
        he(a) ? r.unshift("state") : (r.length !== 1 || !a._customProperties.has(r[0]) || r[0] in a.$state) && r.unshift("$state"), L = !1, n.set(a, r, n.state.value), L = !0;
      }
    }), t.on.editComponentState((n) => {
      if (n.type.startsWith("🍍")) {
        const o = n.type.replace(/^🍍\s*/, ""), a = s._s.get(o);
        if (!a)
          return _(`store "${o}" not found`, "error");
        const { path: r } = n;
        if (r[0] !== "state")
          return _(`Invalid path for store "${o}":
${r}
Only state can be modified.`);
        r[0] = "$state", L = !1, n.set(a, r, n.state.value), L = !0;
      }
    });
  });
}
function Vt(e, s) {
  K.includes(ee(s.$id)) || K.push(ee(s.$id)), Me({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: K,
    app: e,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: !0
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (t) => {
    const n = typeof t.now == "function" ? t.now.bind(t) : Date.now;
    s.$onAction(({ after: r, onError: i, name: u, args: d }) => {
      const m = We++;
      t.addTimelineEvent({
        layerId: T,
        event: {
          time: n(),
          title: "🛫 " + u,
          subtitle: "start",
          data: {
            store: w(s.$id),
            action: w(u),
            args: d
          },
          groupId: m
        }
      }), r((p) => {
        A = void 0, t.addTimelineEvent({
          layerId: T,
          event: {
            time: n(),
            title: "🛬 " + u,
            subtitle: "end",
            data: {
              store: w(s.$id),
              action: w(u),
              args: d,
              result: p
            },
            groupId: m
          }
        });
      }), i((p) => {
        A = void 0, t.addTimelineEvent({
          layerId: T,
          event: {
            time: n(),
            logType: "error",
            title: "💥 " + u,
            subtitle: "end",
            data: {
              store: w(s.$id),
              action: w(u),
              args: d,
              error: p
            },
            groupId: m
          }
        });
      });
    }, !0), s._customProperties.forEach((r) => {
      ke(() => V(s[r]), (i, u) => {
        t.notifyComponentUpdate(), t.sendInspectorState(h), L && t.addTimelineEvent({
          layerId: T,
          event: {
            time: n(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: i,
              oldValue: u
            },
            groupId: A
          }
        });
      }, { deep: !0 });
    }), s.$subscribe(({ events: r, type: i }, u) => {
      if (t.notifyComponentUpdate(), t.sendInspectorState(h), !L)
        return;
      const d = {
        time: n(),
        title: $t(i),
        data: Tt({ store: w(s.$id) }, Pt(r)),
        groupId: A
      };
      A = void 0, i === O.patchFunction ? d.subtitle = "⤵️" : i === O.patchObject ? d.subtitle = "🧩" : r && !Array.isArray(r) && (d.subtitle = r.type), r && (d.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: r
        }
      }), t.addTimelineEvent({
        layerId: T,
        event: d
      });
    }, { detached: !0, flush: "sync" });
    const o = s._hotUpdate;
    s._hotUpdate = I((r) => {
      o(r), t.addTimelineEvent({
        layerId: T,
        event: {
          time: n(),
          title: "🔥 " + s.$id,
          subtitle: "HMR update",
          data: {
            store: w(s.$id),
            info: w("HMR update")
          }
        }
      }), t.notifyComponentUpdate(), t.sendInspectorTree(h), t.sendInspectorState(h);
    });
    const { $dispose: a } = s;
    s.$dispose = () => {
      a(), t.notifyComponentUpdate(), t.sendInspectorTree(h), t.sendInspectorState(h), t.getSettings().logStoreChanges && _(`Disposed "${s.$id}" store 🗑`);
    }, t.notifyComponentUpdate(), t.sendInspectorTree(h), t.sendInspectorState(h), t.getSettings().logStoreChanges && _(`"${s.$id}" store installed 🆕`);
  });
}
let We = 0, A;
function Pe(e, s) {
  const t = s.reduce((n, o) => (n[o] = W(e)[o], n), {});
  for (const n in t)
    e[n] = function() {
      const o = We, a = new Proxy(e, {
        get(...r) {
          return A = o, Reflect.get(...r);
        },
        set(...r) {
          return A = o, Reflect.set(...r);
        }
      });
      return t[n].apply(a, arguments);
    };
}
function Dt({ app: e, store: s, options: t }) {
  if (!s.$id.startsWith("__hot:")) {
    if (t.state && (s._isOptionsAPI = !0), typeof t.state == "function") {
      Pe(
        // @ts-expect-error: can cast the store...
        s,
        Object.keys(t.actions)
      );
      const n = s._hotUpdate;
      W(s)._hotUpdate = function(o) {
        n.apply(this, arguments), Pe(s, Object.keys(o._hmrPayload.actions));
      };
    }
    Vt(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      s
    );
  }
}
function kt() {
  const e = De(!0), s = e.run(() => B({}));
  let t = [], n = [];
  const o = I({
    install(a) {
      J(o), o._a = a, a.provide(Ue, o), a.config.globalProperties.$pinia = o, G && At(a, o), n.forEach((r) => t.push(r)), n = [];
    },
    use(a) {
      return !this._a && !Le ? n.push(a) : t.push(a), this;
    },
    _p: t,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: s
  });
  return G && typeof Proxy < "u" && o.use(Dt), o;
}
function Qe(e, s) {
  for (const t in s) {
    const n = s[t];
    if (!(t in e))
      continue;
    const o = e[t];
    D(o) && D(n) && !x(n) && !te(n) ? e[t] = Qe(o, n) : e[t] = n;
  }
  return e;
}
const ze = () => {
};
function $e(e, s, t, n = ze) {
  e.push(s);
  const o = () => {
    const a = e.indexOf(s);
    a > -1 && (e.splice(a, 1), n());
  };
  return !t && rt() && it(o), o;
}
function C(e, ...s) {
  e.slice().forEach((t) => {
    t(...s);
  });
}
function me(e, s) {
  e instanceof Map && s instanceof Map && s.forEach((t, n) => e.set(n, t)), e instanceof Set && s instanceof Set && s.forEach(e.add, e);
  for (const t in s) {
    if (!s.hasOwnProperty(t))
      continue;
    const n = s[t], o = e[t];
    D(o) && D(n) && e.hasOwnProperty(t) && !x(n) && !te(n) ? e[t] = me(o, n) : e[t] = n;
  }
  return e;
}
const jt = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Ct(e) {
  return !D(e) || !e.hasOwnProperty(jt);
}
const { assign: E } = Object;
function Te(e) {
  return !!(x(e) && e.effect);
}
function Ae(e, s, t, n) {
  const { state: o, actions: a, getters: r } = s, i = t.state.value[e];
  let u;
  function d() {
    !i && (process.env.NODE_ENV === "production" || !n) && (t.state.value[e] = o ? o() : {});
    const m = process.env.NODE_ENV !== "production" && n ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Se(B(o ? o() : {}).value)
    ) : Se(t.state.value[e]);
    return E(m, a, Object.keys(r || {}).reduce((p, v) => (process.env.NODE_ENV !== "production" && v in m && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${v}" in store "${e}".`), p[v] = I(je(() => {
      J(t);
      const S = t._s.get(e);
      return r[v].call(S, S);
    })), p), {}));
  }
  return u = pe(e, d, s, t, n, !0), u;
}
function pe(e, s, t = {}, n, o, a) {
  let r;
  const i = E({ actions: {} }, t);
  if (process.env.NODE_ENV !== "production" && !n._e.active)
    throw new Error("Pinia destroyed");
  const u = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Le && (u.onTrigger = (l) => {
    d ? S = l : d == !1 && !f._hotUpdating && (Array.isArray(S) ? S.push(l) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let d, m, p = I([]), v = I([]), S;
  const k = n.state.value[e];
  !a && !k && (process.env.NODE_ENV === "production" || !o) && (n.state.value[e] = {});
  const oe = B({});
  let ye;
  function ve(l) {
    let c;
    d = m = !1, process.env.NODE_ENV !== "production" && (S = []), typeof l == "function" ? (l(n.state.value[e]), c = {
      type: O.patchFunction,
      storeId: e,
      events: S
    }) : (me(n.state.value[e], l), c = {
      type: O.patchObject,
      payload: l,
      storeId: e,
      events: S
    });
    const g = ye = Symbol();
    we().then(() => {
      ye === g && (d = !0);
    }), m = !0, C(p, c, n.state.value[e]);
  }
  const Ze = a ? function() {
    const { state: c } = t, g = c ? c() : {};
    this.$patch((y) => {
      E(y, g);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : ze
  );
  function Ke() {
    r.stop(), p = [], v = [], n._s.delete(e);
  }
  function be(l, c) {
    return function() {
      J(n);
      const g = Array.from(arguments), y = [], M = [];
      function et(b) {
        y.push(b);
      }
      function tt(b) {
        M.push(b);
      }
      C(v, {
        args: g,
        name: l,
        store: f,
        after: et,
        onError: tt
      });
      let U;
      try {
        U = c.apply(this && this.$id === e ? this : f, g);
      } catch (b) {
        throw C(M, b), b;
      }
      return U instanceof Promise ? U.then((b) => (C(y, b), b)).catch((b) => (C(M, b), Promise.reject(b))) : (C(y, U), U);
    };
  }
  const Q = /* @__PURE__ */ I({
    actions: {},
    getters: {},
    state: [],
    hotState: oe
  }), Ee = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: $e.bind(null, v),
    $patch: ve,
    $reset: Ze,
    $subscribe(l, c = {}) {
      const g = $e(p, l, c.detached, () => y()), y = r.run(() => ke(() => n.state.value[e], (M) => {
        (c.flush === "sync" ? m : d) && l({
          storeId: e,
          type: O.direct,
          events: S
        }, M);
      }, E({}, u, c)));
      return g;
    },
    $dispose: Ke
  }, f = ot(process.env.NODE_ENV !== "production" || G ? E(
    {
      _hmrPayload: Q,
      _customProperties: I(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    Ee
    // must be added later
    // setupStore
  ) : Ee);
  n._s.set(e, f);
  const P = n._e.run(() => (r = De(), r.run(() => s())));
  for (const l in P) {
    const c = P[l];
    if (x(c) && !Te(c) || te(c))
      process.env.NODE_ENV !== "production" && o ? Y(oe.value, l, q(P, l)) : a || (k && Ct(c) && (x(c) ? c.value = k[l] : me(c, k[l])), n.state.value[e][l] = c), process.env.NODE_ENV !== "production" && Q.state.push(l);
    else if (typeof c == "function") {
      const g = process.env.NODE_ENV !== "production" && o ? c : be(l, c);
      P[l] = g, process.env.NODE_ENV !== "production" && (Q.actions[l] = c), i.actions[l] = c;
    } else
      process.env.NODE_ENV !== "production" && Te(c) && (Q.getters[l] = a ? (
        // @ts-expect-error
        t.getters[l]
      ) : c, se && (P._getters || // @ts-expect-error: same
      (P._getters = I([]))).push(l));
  }
  if (E(f, P), E(W(f), P), Object.defineProperty(f, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? oe.value : n.state.value[e],
    set: (l) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      ve((c) => {
        E(c, l);
      });
    }
  }), process.env.NODE_ENV !== "production" && (f._hotUpdate = I((l) => {
    f._hotUpdating = !0, l._hmrPayload.state.forEach((c) => {
      if (c in f.$state) {
        const g = l.$state[c], y = f.$state[c];
        typeof g == "object" && D(g) && D(y) ? Qe(g, y) : l.$state[c] = y;
      }
      Y(f, c, q(l.$state, c));
    }), Object.keys(f.$state).forEach((c) => {
      c in l.$state || ue(f, c);
    }), d = !1, m = !1, n.state.value[e] = q(l._hmrPayload, "hotState"), m = !0, we().then(() => {
      d = !0;
    });
    for (const c in l._hmrPayload.actions) {
      const g = l[c];
      Y(f, c, be(c, g));
    }
    for (const c in l._hmrPayload.getters) {
      const g = l._hmrPayload.getters[c], y = a ? (
        // special handling of options api
        je(() => (J(n), g.call(f, f)))
      ) : g;
      Y(f, c, y);
    }
    Object.keys(f._hmrPayload.getters).forEach((c) => {
      c in l._hmrPayload.getters || ue(f, c);
    }), Object.keys(f._hmrPayload.actions).forEach((c) => {
      c in l._hmrPayload.actions || ue(f, c);
    }), f._hmrPayload = l._hmrPayload, f._getters = l._getters, f._hotUpdating = !1;
  })), G) {
    const l = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((c) => {
      Object.defineProperty(f, c, E({ value: f[c] }, l));
    });
  }
  return n._p.forEach((l) => {
    if (G) {
      const c = r.run(() => l({
        store: f,
        app: n._a,
        pinia: n,
        options: i
      }));
      Object.keys(c || {}).forEach((g) => f._customProperties.add(g)), E(f, c);
    } else
      E(f, r.run(() => l({
        store: f,
        app: n._a,
        pinia: n,
        options: i
      })));
  }), process.env.NODE_ENV !== "production" && f.$state && typeof f.$state == "object" && typeof f.$state.constructor == "function" && !f.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${f.$id}".`), k && a && t.hydrate && t.hydrate(f.$state, k), d = !0, m = !0, f;
}
function Lt(e, s, t) {
  let n, o;
  const a = typeof s == "function";
  typeof e == "string" ? (n = e, o = a ? t : s) : (o = e, n = e.id);
  function r(i, u) {
    const d = nt();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && F && F._testing ? null : i) || d && st(Ue, null), i && J(i), process.env.NODE_ENV !== "production" && !F)
      throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
    i = F, i._s.has(n) || (a ? pe(n, s, o, i) : Ae(n, o, i), process.env.NODE_ENV !== "production" && (r._pinia = i));
    const m = i._s.get(n);
    if (process.env.NODE_ENV !== "production" && u) {
      const p = "__hot:" + n, v = a ? pe(p, s, o, i, !0) : Ae(p, E({}, o), i, !0);
      u._hotUpdate(v), delete i.state.value[p], i._s.delete(p);
    }
    if (process.env.NODE_ENV !== "production" && se && d && d.proxy && // avoid adding stores that are just built for hot module replacement
    !u) {
      const p = d.proxy, v = "_pStores" in p ? p._pStores : p._pStores = {};
      v[n] = m;
    }
    return m;
  }
  return r.$id = n, r;
}
function xt(e) {
  {
    e = W(e);
    const s = {};
    for (const t in e) {
      const n = e[t];
      (x(n) || te(n)) && (s[t] = // ---
      q(e, t));
    }
    return s;
  }
}
const Ye = Lt("messages", () => {
  const e = B([]), s = B(!1);
  function t(r) {
    e.value.unshift(r), r.duration && setTimeout(() => n(r), r.duration);
  }
  function n(r) {
    e.value = e.value.filter((i) => i.id !== r.id);
  }
  function o() {
    s.value = !0;
  }
  function a() {
    s.value = !1;
  }
  return { messages: e, wait: s, removeMessage: n, newMessage: t, waitAction: o, unwaitAction: a };
});
function fe(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const Mt = ["data-message-type"], Ut = { class: "message__img" }, Rt = ["src"], Ft = { class: "message__title" }, Ht = ne({
  name: "AppToast"
}), Ve = /* @__PURE__ */ ne({
  ...Ht,
  props: {
    message: null
  },
  emits: ["remove"],
  setup(e, { emit: s }) {
    const t = e;
    function n(o) {
      o && s("remove", o);
    }
    return (o, a) => ($(), R("li", {
      class: z(["message__item", `message__item--${t.message.type}`, V(fe)(t.message.class || "")]),
      "data-message-type": t.message.type
    }, [
      re("div", Ut, [
        H(o.$slots, `message__img-${t.message.type}`, {
          item: t.message
        }, () => [
          t.message.img ? ($(), R("img", {
            key: 1,
            src: typeof t.message.img == "object" ? t.message.img.value : t.message.img,
            class: z([
              "message__img-custom",
              typeof t.message.img == "object" ? V(fe)(t.message.img.class) : ""
            ]),
            alt: "message avatar"
          }, null, 10, Rt)) : ($(), R("div", {
            key: 0,
            class: z(t.message.type === "wait" ? "message__img-wait" : t.message.type === "success" ? "message__img-success" : t.message.type === "error" ? "message__img-error" : t.message.type === "warning" ? "message__img-warning" : "message__img-custom")
          }, ie(t.message.type === "success" ? "✓" : t.message.type === "warning" ? "!" : ""), 3))
        ])
      ]),
      Oe(" " + ie(t.message.key) + " ", 1),
      re("div", Ft, [
        H(o.$slots, `message__title-${t.message.type}`, {
          item: { ...t.message }
        }, () => [
          re("p", {
            class: z([
              "message__title-content",
              typeof t.message.title == "object" ? V(fe)(t.message.title.class) : ""
            ])
          }, ie(typeof t.message.title == "object" ? t.message.title.value : t.message.title), 3)
        ])
      ]),
      t.message.type !== "wait" ? ($(), R("button", {
        key: 0,
        type: "button",
        class: "message__close",
        onClick: a[0] || (a[0] = (r) => n(t.message))
      }, [
        H(o.$slots, "message__delete-btn", {}, () => [
          Oe(" × ")
        ])
      ])) : Ce("", !0)
    ], 10, Mt));
  }
});
function qe(e) {
  return { ...e, id: Date.now().toString() };
}
const Gt = qe({
  title: "Wait please ..",
  type: "wait"
}), Bt = ne({
  name: "MessagesHandleComponent"
}), Xe = /* @__PURE__ */ ne({
  ...Bt,
  setup(e) {
    const s = Ye(), { messages: t, wait: n } = xt(s);
    function o(a) {
      s.removeMessage(a);
    }
    return (a, r) => ($(), ae(at, {
      name: "list",
      tag: "ul",
      class: "message__list"
    }, {
      default: ce(() => [
        V(n) ? ($(), ae(Ve, {
          key: 0,
          message: V(Gt)
        }, Ne({ _: 2 }, [
          le(a.$slots, (i, u) => ({
            name: u,
            fn: ce(() => [
              H(a.$slots, u)
            ])
          }))
        ]), 1032, ["message"])) : Ce("", !0),
        ($(!0), R(ct, null, le(V(t), (i) => ($(), ae(Ve, {
          key: i.id,
          message: i,
          onRemove: o
        }, Ne({ _: 2 }, [
          le(a.$slots, (u, d) => ({
            name: d,
            fn: ce((m) => [
              H(a.$slots, d, {
                item: { ...m }
              })
            ])
          }))
        ]), 1032, ["message"]))), 128))
      ]),
      _: 3
    }));
  }
}), Jt = {
  install: (e) => {
    const s = Ye();
    function t(i) {
      const u = qe(i);
      s.newMessage(u);
    }
    function n(i) {
      s.removeMessage(i);
    }
    function o() {
      s.waitAction();
    }
    function a() {
      s.unwaitAction();
    }
    const r = {
      addNewMessage: t,
      removeMessage: n,
      waitAction: o,
      stopAction: a
    };
    e.provide("message", r), e.component("VMessage", Xe), e.config.globalProperties.$message = r;
  }
}, Qt = {
  install: (e) => {
    e.component("AppMessages", Xe);
    const s = kt();
    e.use(s), e.use(Jt);
  }
};
export {
  Qt as default
};
