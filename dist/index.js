import { effectScope as De, ref as D, markRaw as I, toRaw as Q, isRef as M, isReactive as te, toRef as q, getCurrentInstance as et, inject as tt, watch as ke, unref as $, reactive as nt, nextTick as we, computed as pe, getCurrentScope as st, onScopeDispose as ot, toRefs as Se, defineComponent as ne, openBlock as T, createElementBlock as F, normalizeClass as H, createElementVNode as re, renderSlot as B, toDisplayString as Oe, createTextVNode as rt, createCommentVNode as je, createBlock as ie, TransitionGroup as it, withCtx as ae, createSlots as Ne, renderList as ce, Fragment as at } from "vue";
var Ce = !1;
function Y(e, s, t) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, s), e.splice(s, 1, t), t) : (e[s] = t, t);
}
function le(e, s) {
  if (Array.isArray(e)) {
    e.splice(s, 1);
    return;
  }
  delete e[s];
}
function ct() {
  return Le().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Le() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const lt = typeof Proxy == "function", ut = "devtools-plugin:setup", ft = "plugin:settings:set";
let C, fe;
function dt() {
  var e;
  return C !== void 0 || (typeof window < "u" && window.performance ? (C = !0, fe = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (C = !0, fe = global.perf_hooks.performance) : C = !1), C;
}
function gt() {
  return dt() ? fe.now() : Date.now();
}
class mt {
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
        return gt();
      }
    }, t && t.on(ft, (r, i) => {
      r === this.plugin.id && this.fallbacks.setSettings(i);
    }), this.proxiedOn = new Proxy({}, {
      get: (r, i) => this.target ? this.target.on[i] : (...c) => {
        this.onQueue.push({
          method: i,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (r, i) => this.target ? this.target[i] : i === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(i) ? (...c) => (this.targetQueue.push({
        method: i,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[i](...c)) : (...c) => new Promise((f) => {
        this.targetQueue.push({
          method: i,
          args: c,
          resolve: f
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
function xe(e, s) {
  const t = e, n = Le(), o = ct(), a = lt && t.enableEarlyProxy;
  if (o && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    o.emit(ut, e, s);
  else {
    const r = a ? new mt(t, o) : null;
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
let G;
const W = (e) => G = e, Me = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function k(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var O;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(O || (O = {}));
const se = typeof window < "u", J = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && se, Ie = /* @__PURE__ */ (() => typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null })();
function pt(e, { autoBom: s = !1 } = {}) {
  return s && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e], { type: e.type }) : e;
}
function _e(e, s, t) {
  const n = new XMLHttpRequest();
  n.open("GET", e), n.responseType = "blob", n.onload = function() {
    Fe(n.response, s, t);
  }, n.onerror = function() {
    console.error("could not download file");
  }, n.send();
}
function Ue(e) {
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
const Z = typeof navigator == "object" ? navigator : { userAgent: "" }, Re = /* @__PURE__ */ (() => /Macintosh/.test(Z.userAgent) && /AppleWebKit/.test(Z.userAgent) && !/Safari/.test(Z.userAgent))(), Fe = se ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Re ? _t : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in Z ? ht : (
      // Fallback to using FileReader and a popup
      yt
    )
  )
) : () => {
};
function _t(e, s = "download", t) {
  const n = document.createElement("a");
  n.download = s, n.rel = "noopener", typeof e == "string" ? (n.href = e, n.origin !== location.origin ? Ue(n.href) ? _e(e, s, t) : (n.target = "_blank", X(n)) : X(n)) : (n.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(n.href);
  }, 4e4), setTimeout(function() {
    X(n);
  }, 0));
}
function ht(e, s = "download", t) {
  if (typeof e == "string")
    if (Ue(e))
      _e(e, s, t);
    else {
      const n = document.createElement("a");
      n.href = e, n.target = "_blank", setTimeout(function() {
        X(n);
      });
    }
  else
    navigator.msSaveOrOpenBlob(pt(e, t), s);
}
function yt(e, s, t, n) {
  if (n = n || open("", "_blank"), n && (n.document.title = n.document.body.innerText = "downloading..."), typeof e == "string")
    return _e(e, s, t);
  const o = e.type === "application/octet-stream", a = /constructor/i.test(String(Ie.HTMLElement)) || "safari" in Ie, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || o && a || Re) && typeof FileReader < "u") {
    const i = new FileReader();
    i.onloadend = function() {
      let c = i.result;
      if (typeof c != "string")
        throw n = null, new Error("Wrong reader.result type");
      c = r ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), n ? n.location.href = c : location.assign(c), n = null;
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
function He() {
  if (!("clipboard" in navigator))
    return _("Your browser doesn't support the Clipboard API", "error"), !0;
}
function Ge(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (_('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function vt(e) {
  if (!He())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), _("Global state copied to clipboard.");
    } catch (s) {
      if (Ge(s))
        return;
      _("Failed to serialize the state. Check the console for more details.", "error"), console.error(s);
    }
}
async function bt(e) {
  if (!He())
    try {
      e.state.value = JSON.parse(await navigator.clipboard.readText()), _("Global state pasted from clipboard.");
    } catch (s) {
      if (Ge(s))
        return;
      _("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(s);
    }
}
async function Et(e) {
  try {
    Fe(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (s) {
    _("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(s);
  }
}
let N;
function wt() {
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
async function St(e) {
  try {
    const t = await (await wt())();
    if (!t)
      return;
    const { text: n, file: o } = t;
    e.state.value = JSON.parse(n), _(`Global state imported from "${o.name}".`);
  } catch (s) {
    _("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(s);
  }
}
function S(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const Be = "🍍 Pinia (root)", de = "_root";
function Ot(e) {
  return he(e) ? {
    id: de,
    label: Be
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Nt(e) {
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
          value: r._getters.reduce((i, c) => (i[c] = r[c], i), {})
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
function It(e) {
  return e ? Array.isArray(e) ? e.reduce((s, t) => (s.keys.push(t.key), s.operations.push(t.type), s.oldValue[t.key] = t.oldValue, s.newValue[t.key] = t.newValue, s), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: S(e.type),
    key: S(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Pt(e) {
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
let x = !0;
const K = [], A = "pinia:mutations", h = "pinia", { assign: $t } = Object, ee = (e) => "🍍 " + e;
function Tt(e, s) {
  xe({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: K,
    app: e
  }, (t) => {
    typeof t.now != "function" && _("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), t.addTimelineLayer({
      id: A,
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
            vt(s);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await bt(s), t.sendInspectorTree(h), t.sendInspectorState(h);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Et(s);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await St(s), t.sendInspectorTree(h), t.sendInspectorState(h);
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
                value: Q(i.$state),
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
              Object.keys(i.$state).reduce((c, f) => (c[f] = i.$state[f], c), {})
            )
          }), i._getters && i._getters.length && n.instanceData.state.push({
            type: ee(i.$id),
            key: "getters",
            editable: !1,
            value: i._getters.reduce((c, f) => {
              try {
                c[f] = i[f];
              } catch (m) {
                c[f] = m;
              }
              return c;
            }, {})
          });
        });
      }
    }), t.on.getInspectorTree((n) => {
      if (n.app === e && n.inspectorId === h) {
        let o = [s];
        o = o.concat(Array.from(s._s.values())), n.rootNodes = (n.filter ? o.filter((a) => "$id" in a ? a.$id.toLowerCase().includes(n.filter.toLowerCase()) : Be.toLowerCase().includes(n.filter.toLowerCase())) : o).map(Ot);
      }
    }), t.on.getInspectorState((n) => {
      if (n.app === e && n.inspectorId === h) {
        const o = n.nodeId === de ? s : s._s.get(n.nodeId);
        if (!o)
          return;
        o && (n.state = Nt(o));
      }
    }), t.on.editInspectorState((n, o) => {
      if (n.app === e && n.inspectorId === h) {
        const a = n.nodeId === de ? s : s._s.get(n.nodeId);
        if (!a)
          return _(`store "${n.nodeId}" not found`, "error");
        const { path: r } = n;
        he(a) ? r.unshift("state") : (r.length !== 1 || !a._customProperties.has(r[0]) || r[0] in a.$state) && r.unshift("$state"), x = !1, n.set(a, r, n.state.value), x = !0;
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
        r[0] = "$state", x = !1, n.set(a, r, n.state.value), x = !0;
      }
    });
  });
}
function At(e, s) {
  K.includes(ee(s.$id)) || K.push(ee(s.$id)), xe({
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
    s.$onAction(({ after: r, onError: i, name: c, args: f }) => {
      const m = Je++;
      t.addTimelineEvent({
        layerId: A,
        event: {
          time: n(),
          title: "🛫 " + c,
          subtitle: "start",
          data: {
            store: S(s.$id),
            action: S(c),
            args: f
          },
          groupId: m
        }
      }), r((g) => {
        V = void 0, t.addTimelineEvent({
          layerId: A,
          event: {
            time: n(),
            title: "🛬 " + c,
            subtitle: "end",
            data: {
              store: S(s.$id),
              action: S(c),
              args: f,
              result: g
            },
            groupId: m
          }
        });
      }), i((g) => {
        V = void 0, t.addTimelineEvent({
          layerId: A,
          event: {
            time: n(),
            logType: "error",
            title: "💥 " + c,
            subtitle: "end",
            data: {
              store: S(s.$id),
              action: S(c),
              args: f,
              error: g
            },
            groupId: m
          }
        });
      });
    }, !0), s._customProperties.forEach((r) => {
      ke(() => $(s[r]), (i, c) => {
        t.notifyComponentUpdate(), t.sendInspectorState(h), x && t.addTimelineEvent({
          layerId: A,
          event: {
            time: n(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: i,
              oldValue: c
            },
            groupId: V
          }
        });
      }, { deep: !0 });
    }), s.$subscribe(({ events: r, type: i }, c) => {
      if (t.notifyComponentUpdate(), t.sendInspectorState(h), !x)
        return;
      const f = {
        time: n(),
        title: Pt(i),
        data: $t({ store: S(s.$id) }, It(r)),
        groupId: V
      };
      V = void 0, i === O.patchFunction ? f.subtitle = "⤵️" : i === O.patchObject ? f.subtitle = "🧩" : r && !Array.isArray(r) && (f.subtitle = r.type), r && (f.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: r
        }
      }), t.addTimelineEvent({
        layerId: A,
        event: f
      });
    }, { detached: !0, flush: "sync" });
    const o = s._hotUpdate;
    s._hotUpdate = I((r) => {
      o(r), t.addTimelineEvent({
        layerId: A,
        event: {
          time: n(),
          title: "🔥 " + s.$id,
          subtitle: "HMR update",
          data: {
            store: S(s.$id),
            info: S("HMR update")
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
let Je = 0, V;
function Pe(e, s) {
  const t = s.reduce((n, o) => (n[o] = Q(e)[o], n), {});
  for (const n in t)
    e[n] = function() {
      const o = Je, a = new Proxy(e, {
        get(...r) {
          return V = o, Reflect.get(...r);
        },
        set(...r) {
          return V = o, Reflect.set(...r);
        }
      });
      return t[n].apply(a, arguments);
    };
}
function Vt({ app: e, store: s, options: t }) {
  if (!s.$id.startsWith("__hot:")) {
    if (t.state && (s._isOptionsAPI = !0), typeof t.state == "function") {
      Pe(
        // @ts-expect-error: can cast the store...
        s,
        Object.keys(t.actions)
      );
      const n = s._hotUpdate;
      Q(s)._hotUpdate = function(o) {
        n.apply(this, arguments), Pe(s, Object.keys(o._hmrPayload.actions));
      };
    }
    At(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      s
    );
  }
}
function Dt() {
  const e = De(!0), s = e.run(() => D({}));
  let t = [], n = [];
  const o = I({
    install(a) {
      W(o), o._a = a, a.provide(Me, o), a.config.globalProperties.$pinia = o, J && Tt(a, o), n.forEach((r) => t.push(r)), n = [];
    },
    use(a) {
      return !this._a && !Ce ? n.push(a) : t.push(a), this;
    },
    _p: t,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: s
  });
  return J && typeof Proxy < "u" && o.use(Vt), o;
}
function We(e, s) {
  for (const t in s) {
    const n = s[t];
    if (!(t in e))
      continue;
    const o = e[t];
    k(o) && k(n) && !M(n) && !te(n) ? e[t] = We(o, n) : e[t] = n;
  }
  return e;
}
const Qe = () => {
};
function $e(e, s, t, n = Qe) {
  e.push(s);
  const o = () => {
    const a = e.indexOf(s);
    a > -1 && (e.splice(a, 1), n());
  };
  return !t && st() && ot(o), o;
}
function L(e, ...s) {
  e.slice().forEach((t) => {
    t(...s);
  });
}
function ge(e, s) {
  e instanceof Map && s instanceof Map && s.forEach((t, n) => e.set(n, t)), e instanceof Set && s instanceof Set && s.forEach(e.add, e);
  for (const t in s) {
    if (!s.hasOwnProperty(t))
      continue;
    const n = s[t], o = e[t];
    k(o) && k(n) && e.hasOwnProperty(t) && !M(n) && !te(n) ? e[t] = ge(o, n) : e[t] = n;
  }
  return e;
}
const kt = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function jt(e) {
  return !k(e) || !e.hasOwnProperty(kt);
}
const { assign: w } = Object;
function Te(e) {
  return !!(M(e) && e.effect);
}
function Ae(e, s, t, n) {
  const { state: o, actions: a, getters: r } = s, i = t.state.value[e];
  let c;
  function f() {
    !i && (process.env.NODE_ENV === "production" || !n) && (t.state.value[e] = o ? o() : {});
    const m = process.env.NODE_ENV !== "production" && n ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Se(D(o ? o() : {}).value)
    ) : Se(t.state.value[e]);
    return w(m, a, Object.keys(r || {}).reduce((g, y) => (process.env.NODE_ENV !== "production" && y in m && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${y}" in store "${e}".`), g[y] = I(pe(() => {
      W(t);
      const b = t._s.get(e);
      return r[y].call(b, b);
    })), g), {}));
  }
  return c = me(e, f, s, t, n, !0), c;
}
function me(e, s, t = {}, n, o, a) {
  let r;
  const i = w({ actions: {} }, t);
  if (process.env.NODE_ENV !== "production" && !n._e.active)
    throw new Error("Pinia destroyed");
  const c = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Ce && (c.onTrigger = (u) => {
    f ? b = u : f == !1 && !d._hotUpdating && (Array.isArray(b) ? b.push(u) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let f, m, g = I([]), y = I([]), b;
  const j = n.state.value[e];
  !a && !j && (process.env.NODE_ENV === "production" || !o) && (n.state.value[e] = {});
  const oe = D({});
  let ye;
  function ve(u) {
    let l;
    f = m = !1, process.env.NODE_ENV !== "production" && (b = []), typeof u == "function" ? (u(n.state.value[e]), l = {
      type: O.patchFunction,
      storeId: e,
      events: b
    }) : (ge(n.state.value[e], u), l = {
      type: O.patchObject,
      payload: u,
      storeId: e,
      events: b
    });
    const p = ye = Symbol();
    we().then(() => {
      ye === p && (f = !0);
    }), m = !0, L(g, l, n.state.value[e]);
  }
  const qe = a ? function() {
    const { state: l } = t, p = l ? l() : {};
    this.$patch((v) => {
      w(v, p);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : Qe
  );
  function Xe() {
    r.stop(), g = [], y = [], n._s.delete(e);
  }
  function be(u, l) {
    return function() {
      W(n);
      const p = Array.from(arguments), v = [], U = [];
      function Ze(E) {
        v.push(E);
      }
      function Ke(E) {
        U.push(E);
      }
      L(y, {
        args: p,
        name: u,
        store: d,
        after: Ze,
        onError: Ke
      });
      let R;
      try {
        R = l.apply(this && this.$id === e ? this : d, p);
      } catch (E) {
        throw L(U, E), E;
      }
      return R instanceof Promise ? R.then((E) => (L(v, E), E)).catch((E) => (L(U, E), Promise.reject(E))) : (L(v, R), R);
    };
  }
  const z = /* @__PURE__ */ I({
    actions: {},
    getters: {},
    state: [],
    hotState: oe
  }), Ee = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: $e.bind(null, y),
    $patch: ve,
    $reset: qe,
    $subscribe(u, l = {}) {
      const p = $e(g, u, l.detached, () => v()), v = r.run(() => ke(() => n.state.value[e], (U) => {
        (l.flush === "sync" ? m : f) && u({
          storeId: e,
          type: O.direct,
          events: b
        }, U);
      }, w({}, c, l)));
      return p;
    },
    $dispose: Xe
  }, d = nt(process.env.NODE_ENV !== "production" || J ? w(
    {
      _hmrPayload: z,
      _customProperties: I(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    Ee
    // must be added later
    // setupStore
  ) : Ee);
  n._s.set(e, d);
  const P = n._e.run(() => (r = De(), r.run(() => s())));
  for (const u in P) {
    const l = P[u];
    if (M(l) && !Te(l) || te(l))
      process.env.NODE_ENV !== "production" && o ? Y(oe.value, u, q(P, u)) : a || (j && jt(l) && (M(l) ? l.value = j[u] : ge(l, j[u])), n.state.value[e][u] = l), process.env.NODE_ENV !== "production" && z.state.push(u);
    else if (typeof l == "function") {
      const p = process.env.NODE_ENV !== "production" && o ? l : be(u, l);
      P[u] = p, process.env.NODE_ENV !== "production" && (z.actions[u] = l), i.actions[u] = l;
    } else
      process.env.NODE_ENV !== "production" && Te(l) && (z.getters[u] = a ? (
        // @ts-expect-error
        t.getters[u]
      ) : l, se && (P._getters || // @ts-expect-error: same
      (P._getters = I([]))).push(u));
  }
  if (w(d, P), w(Q(d), P), Object.defineProperty(d, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? oe.value : n.state.value[e],
    set: (u) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      ve((l) => {
        w(l, u);
      });
    }
  }), process.env.NODE_ENV !== "production" && (d._hotUpdate = I((u) => {
    d._hotUpdating = !0, u._hmrPayload.state.forEach((l) => {
      if (l in d.$state) {
        const p = u.$state[l], v = d.$state[l];
        typeof p == "object" && k(p) && k(v) ? We(p, v) : u.$state[l] = v;
      }
      Y(d, l, q(u.$state, l));
    }), Object.keys(d.$state).forEach((l) => {
      l in u.$state || le(d, l);
    }), f = !1, m = !1, n.state.value[e] = q(u._hmrPayload, "hotState"), m = !0, we().then(() => {
      f = !0;
    });
    for (const l in u._hmrPayload.actions) {
      const p = u[l];
      Y(d, l, be(l, p));
    }
    for (const l in u._hmrPayload.getters) {
      const p = u._hmrPayload.getters[l], v = a ? (
        // special handling of options api
        pe(() => (W(n), p.call(d, d)))
      ) : p;
      Y(d, l, v);
    }
    Object.keys(d._hmrPayload.getters).forEach((l) => {
      l in u._hmrPayload.getters || le(d, l);
    }), Object.keys(d._hmrPayload.actions).forEach((l) => {
      l in u._hmrPayload.actions || le(d, l);
    }), d._hmrPayload = u._hmrPayload, d._getters = u._getters, d._hotUpdating = !1;
  })), J) {
    const u = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((l) => {
      Object.defineProperty(d, l, w({ value: d[l] }, u));
    });
  }
  return n._p.forEach((u) => {
    if (J) {
      const l = r.run(() => u({
        store: d,
        app: n._a,
        pinia: n,
        options: i
      }));
      Object.keys(l || {}).forEach((p) => d._customProperties.add(p)), w(d, l);
    } else
      w(d, r.run(() => u({
        store: d,
        app: n._a,
        pinia: n,
        options: i
      })));
  }), process.env.NODE_ENV !== "production" && d.$state && typeof d.$state == "object" && typeof d.$state.constructor == "function" && !d.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${d.$id}".`), j && a && t.hydrate && t.hydrate(d.$state, j), f = !0, m = !0, d;
}
function Ct(e, s, t) {
  let n, o;
  const a = typeof s == "function";
  typeof e == "string" ? (n = e, o = a ? t : s) : (o = e, n = e.id);
  function r(i, c) {
    const f = et();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && G && G._testing ? null : i) || f && tt(Me, null), i && W(i), process.env.NODE_ENV !== "production" && !G)
      throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
    i = G, i._s.has(n) || (a ? me(n, s, o, i) : Ae(n, o, i), process.env.NODE_ENV !== "production" && (r._pinia = i));
    const m = i._s.get(n);
    if (process.env.NODE_ENV !== "production" && c) {
      const g = "__hot:" + n, y = a ? me(g, s, o, i, !0) : Ae(g, w({}, o), i, !0);
      c._hotUpdate(y), delete i.state.value[g], i._s.delete(g);
    }
    if (process.env.NODE_ENV !== "production" && se && f && f.proxy && // avoid adding stores that are just built for hot module replacement
    !c) {
      const g = f.proxy, y = "_pStores" in g ? g._pStores : g._pStores = {};
      y[n] = m;
    }
    return m;
  }
  return r.$id = n, r;
}
function Lt(e) {
  {
    e = Q(e);
    const s = {};
    for (const t in e) {
      const n = e[t];
      (M(n) || te(n)) && (s[t] = // ---
      q(e, t));
    }
    return s;
  }
}
const ze = Ct("messages", () => {
  const e = D([]), s = D(!1), t = D(null), n = D("top-right");
  function o(c) {
    e.value.push(c), c.duration && setTimeout(() => a(c), c.duration);
  }
  function a(c) {
    e.value = e.value.filter((f) => f.id !== c.id);
  }
  function r(c) {
    c && (t.value = c, t.value.type = "wait"), s.value = !0;
  }
  function i() {
    t.value = null, s.value = !1;
  }
  return {
    messages: e,
    wait: t,
    position: n,
    isWait: s,
    removeMessage: a,
    newMessage: o,
    waitAction: r,
    unwaitAction: i
  };
});
function ue(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const xt = ["data-message-type"], Mt = { class: "message__img" }, Ut = ["src"], Rt = { class: "message__title" }, Ft = ne({
  name: "AppToast"
}), Ve = /* @__PURE__ */ ne({
  ...Ft,
  props: {
    message: null
  },
  emits: ["remove"],
  setup(e, { emit: s }) {
    const t = e;
    function n(o) {
      o && o.type !== "wait" && s("remove", o);
    }
    return (o, a) => (T(), F("li", {
      class: H([
        "message__item",
        `message__item--${t.message.type}`,
        $(ue)(t.message.class || "")
      ]),
      "data-message-type": t.message.type
    }, [
      re("div", Mt, [
        B(o.$slots, `message__img-${t.message.type}`, {
          item: t.message
        }, () => [
          t.message.img ? (T(), F("img", {
            key: 1,
            src: typeof t.message.img == "object" ? t.message.img.value : t.message.img,
            class: H([
              "message__img-custom",
              typeof t.message.img == "object" ? $(ue)(t.message.img.class) : ""
            ]),
            alt: "message avatar"
          }, null, 10, Ut)) : (T(), F("div", {
            key: 0,
            class: H(t.message.type === "wait" ? "message__img-wait" : t.message.type === "success" ? "message__img-success" : t.message.type === "error" ? "message__img-error" : t.message.type === "warning" ? "message__img-warning" : "message__img-custom")
          }, Oe(t.message.type === "success" ? "✓" : t.message.type === "warning" ? "!" : ""), 3))
        ])
      ]),
      re("div", Rt, [
        B(o.$slots, `message__title-${t.message.type}`, {
          item: { ...t.message }
        }, () => [
          re("p", {
            class: H([
              "message__title-content",
              typeof t.message.title == "object" ? $(ue)(t.message.title.class) : ""
            ])
          }, Oe(typeof t.message.title == "object" ? t.message.title.value : t.message.title), 3)
        ])
      ]),
      t.message.type !== "wait" ? (T(), F("button", {
        key: 0,
        type: "button",
        class: "message__close",
        onClick: a[0] || (a[0] = (r) => n(t.message))
      }, [
        B(o.$slots, "message__delete-btn", {}, () => [
          rt(" × ")
        ])
      ])) : je("", !0)
    ], 10, xt));
  }
}), Ht = {
  title: "Wait please ..",
  type: "wait"
}, Gt = ne({
  name: "MessagesHandleComponent"
}), Ye = /* @__PURE__ */ ne({
  ...Gt,
  setup(e) {
    const s = ze(), { messages: t, wait: n, position: o, isWait: a } = Lt(s), r = pe(() => n.value ? n.value : Ht);
    function i(c) {
      s.removeMessage(c);
    }
    return (c, f) => (T(), ie(it, {
      name: "list",
      tag: "ul",
      class: H(["message__list", `message__list--${$(o)}`])
    }, {
      default: ae(() => [
        $(a) ? (T(), ie(Ve, {
          key: 0,
          message: $(r)
        }, Ne({ _: 2 }, [
          ce(c.$slots, (m, g) => ({
            name: g,
            fn: ae(() => [
              B(c.$slots, g)
            ])
          }))
        ]), 1032, ["message"])) : je("", !0),
        (T(!0), F(at, null, ce($(t), (m) => (T(), ie(Ve, {
          key: m.id,
          message: m,
          onRemove: i
        }, Ne({ _: 2 }, [
          ce(c.$slots, (g, y) => ({
            name: y,
            fn: ae((b) => [
              B(c.$slots, y, {
                item: { ...b }
              })
            ])
          }))
        ]), 1032, ["message"]))), 128))
      ]),
      _: 3
    }, 8, ["class"]));
  }
});
function Bt(e) {
  return { ...e, id: Date.now().toString() };
}
const Jt = {
  install: (e, s) => {
    const t = ze();
    s != null && s.position && (t.position = s.position);
    function n(c) {
      const f = Bt(c);
      t.newMessage(f);
    }
    function o(c) {
      t.removeMessage(c);
    }
    function a(c) {
      t.waitAction(c);
    }
    function r() {
      t.unwaitAction();
    }
    const i = {
      addNewMessage: n,
      removeMessage: o,
      waitAction: a,
      stopAction: r
    };
    e.provide("message", i), e.component("VMessage", Ye), e.config.globalProperties.$message = i;
  }
}, Qt = {
  install: (e, s) => {
    e.component("AppMessages", Ye);
    const t = Dt();
    e.use(t), e.use(Jt, s);
  }
};
export {
  Qt as default
};
