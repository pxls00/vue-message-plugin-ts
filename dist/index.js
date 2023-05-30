import { effectScope as Te, ref as G, markRaw as N, toRaw as W, isRef as R, isReactive as te, toRef as z, getCurrentInstance as Ze, inject as Ke, watch as Ve, unref as et, reactive as tt, nextTick as me, computed as K, getCurrentScope as st, onScopeDispose as nt, toRefs as _e, defineComponent as ke, openBlock as P, createElementBlock as L, normalizeClass as V, createElementVNode as he, renderSlot as Y, toDisplayString as ot, createCommentVNode as ye, createTextVNode as rt, resolveComponent as it, createBlock as ve, TransitionGroup as at, withCtx as be, Fragment as ct, renderList as Ee, createSlots as lt } from "vue";
var Ae = !1;
function Q(e, n, s) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, n), e.splice(n, 1, s), s) : (e[n] = s, s);
}
function oe(e, n) {
  if (Array.isArray(e)) {
    e.splice(n, 1);
    return;
  }
  delete e[n];
}
function ut() {
  return De().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function De() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const ft = typeof Proxy == "function", dt = "devtools-plugin:setup", gt = "plugin:settings:set";
let j, re;
function pt() {
  var e;
  return j !== void 0 || (typeof window < "u" && window.performance ? (j = !0, re = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (j = !0, re = global.perf_hooks.performance) : j = !1), j;
}
function mt() {
  return pt() ? re.now() : Date.now();
}
class _t {
  constructor(n, s) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = n, this.hook = s;
    const t = {};
    if (n.settings)
      for (const o in n.settings) {
        const i = n.settings[o];
        t[o] = i.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${n.id}`;
    let a = Object.assign({}, t);
    try {
      const o = localStorage.getItem(r), i = JSON.parse(o);
      Object.assign(a, i);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return a;
      },
      setSettings(o) {
        try {
          localStorage.setItem(r, JSON.stringify(o));
        } catch {
        }
        a = o;
      },
      now() {
        return mt();
      }
    }, s && s.on(gt, (o, i) => {
      o === this.plugin.id && this.fallbacks.setSettings(i);
    }), this.proxiedOn = new Proxy({}, {
      get: (o, i) => this.target ? this.target.on[i] : (...l) => {
        this.onQueue.push({
          method: i,
          args: l
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (o, i) => this.target ? this.target[i] : i === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(i) ? (...l) => (this.targetQueue.push({
        method: i,
        args: l,
        resolve: () => {
        }
      }), this.fallbacks[i](...l)) : (...l) => new Promise((f) => {
        this.targetQueue.push({
          method: i,
          args: l,
          resolve: f
        });
      })
    });
  }
  async setRealTarget(n) {
    this.target = n;
    for (const s of this.onQueue)
      this.target.on[s.method](...s.args);
    for (const s of this.targetQueue)
      s.resolve(await this.target[s.method](...s.args));
  }
}
function je(e, n) {
  const s = e, t = De(), r = ut(), a = ft && s.enableEarlyProxy;
  if (r && (t.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    r.emit(dt, e, n);
  else {
    const o = a ? new _t(s, r) : null;
    (t.__VUE_DEVTOOLS_PLUGINS__ = t.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: s,
      setupFn: n,
      proxy: o
    }), o && n(o.proxiedTarget);
  }
}
/*!
  * pinia v2.0.33
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let F;
const B = (e) => F = e, Ce = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function A(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var O;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(O || (O = {}));
const se = typeof window < "u", H = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && se, Se = /* @__PURE__ */ (() => typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null })();
function ht(e, { autoBom: n = !1 } = {}) {
  return n && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e], { type: e.type }) : e;
}
function le(e, n, s) {
  const t = new XMLHttpRequest();
  t.open("GET", e), t.responseType = "blob", t.onload = function() {
    Re(t.response, n, s);
  }, t.onerror = function() {
    console.error("could not download file");
  }, t.send();
}
function Le(e) {
  const n = new XMLHttpRequest();
  n.open("HEAD", e, !1);
  try {
    n.send();
  } catch {
  }
  return n.status >= 200 && n.status <= 299;
}
function q(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const s = document.createEvent("MouseEvents");
    s.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(s);
  }
}
const X = typeof navigator == "object" ? navigator : { userAgent: "" }, Me = /* @__PURE__ */ (() => /Macintosh/.test(X.userAgent) && /AppleWebKit/.test(X.userAgent) && !/Safari/.test(X.userAgent))(), Re = se ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Me ? yt : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in X ? vt : (
      // Fallback to using FileReader and a popup
      bt
    )
  )
) : () => {
};
function yt(e, n = "download", s) {
  const t = document.createElement("a");
  t.download = n, t.rel = "noopener", typeof e == "string" ? (t.href = e, t.origin !== location.origin ? Le(t.href) ? le(e, n, s) : (t.target = "_blank", q(t)) : q(t)) : (t.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(t.href);
  }, 4e4), setTimeout(function() {
    q(t);
  }, 0));
}
function vt(e, n = "download", s) {
  if (typeof e == "string")
    if (Le(e))
      le(e, n, s);
    else {
      const t = document.createElement("a");
      t.href = e, t.target = "_blank", setTimeout(function() {
        q(t);
      });
    }
  else
    navigator.msSaveOrOpenBlob(ht(e, s), n);
}
function bt(e, n, s, t) {
  if (t = t || open("", "_blank"), t && (t.document.title = t.document.body.innerText = "downloading..."), typeof e == "string")
    return le(e, n, s);
  const r = e.type === "application/octet-stream", a = /constructor/i.test(String(Se.HTMLElement)) || "safari" in Se, o = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((o || r && a || Me) && typeof FileReader < "u") {
    const i = new FileReader();
    i.onloadend = function() {
      let l = i.result;
      if (typeof l != "string")
        throw t = null, new Error("Wrong reader.result type");
      l = o ? l : l.replace(/^data:[^;]*;/, "data:attachment/file;"), t ? t.location.href = l : location.assign(l), t = null;
    }, i.readAsDataURL(e);
  } else {
    const i = URL.createObjectURL(e);
    t ? t.location.assign(i) : location.href = i, t = null, setTimeout(function() {
      URL.revokeObjectURL(i);
    }, 4e4);
  }
}
function _(e, n) {
  const s = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(s, n) : n === "error" ? console.error(s) : n === "warn" ? console.warn(s) : console.log(s);
}
function ue(e) {
  return "_a" in e && "install" in e;
}
function Ue() {
  if (!("clipboard" in navigator))
    return _("Your browser doesn't support the Clipboard API", "error"), !0;
}
function xe(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (_('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Et(e) {
  if (!Ue())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), _("Global state copied to clipboard.");
    } catch (n) {
      if (xe(n))
        return;
      _("Failed to serialize the state. Check the console for more details.", "error"), console.error(n);
    }
}
async function St(e) {
  if (!Ue())
    try {
      e.state.value = JSON.parse(await navigator.clipboard.readText()), _("Global state pasted from clipboard.");
    } catch (n) {
      if (xe(n))
        return;
      _("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(n);
    }
}
async function wt(e) {
  try {
    Re(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (n) {
    _("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(n);
  }
}
let I;
function Ot() {
  I || (I = document.createElement("input"), I.type = "file", I.accept = ".json");
  function e() {
    return new Promise((n, s) => {
      I.onchange = async () => {
        const t = I.files;
        if (!t)
          return n(null);
        const r = t.item(0);
        return n(r ? { text: await r.text(), file: r } : null);
      }, I.oncancel = () => n(null), I.onerror = s, I.click();
    });
  }
  return e;
}
async function It(e) {
  try {
    const s = await (await Ot())();
    if (!s)
      return;
    const { text: t, file: r } = s;
    e.state.value = JSON.parse(t), _(`Global state imported from "${r.name}".`);
  } catch (n) {
    _("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(n);
  }
}
function S(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const Fe = "🍍 Pinia (root)", ie = "_root";
function Nt(e) {
  return ue(e) ? {
    id: ie,
    label: Fe
  } : {
    id: e.$id,
    label: e.$id
  };
}
function $t(e) {
  if (ue(e)) {
    const s = Array.from(e._s.keys()), t = e._s;
    return {
      state: s.map((a) => ({
        editable: !0,
        key: a,
        value: e.state.value[a]
      })),
      getters: s.filter((a) => t.get(a)._getters).map((a) => {
        const o = t.get(a);
        return {
          editable: !1,
          key: a,
          value: o._getters.reduce((i, l) => (i[l] = o[l], i), {})
        };
      })
    };
  }
  const n = {
    state: Object.keys(e.$state).map((s) => ({
      editable: !0,
      key: s,
      value: e.$state[s]
    }))
  };
  return e._getters && e._getters.length && (n.getters = e._getters.map((s) => ({
    editable: !1,
    key: s,
    value: e[s]
  }))), e._customProperties.size && (n.customProperties = Array.from(e._customProperties).map((s) => ({
    editable: !0,
    key: s,
    value: e[s]
  }))), n;
}
function Pt(e) {
  return e ? Array.isArray(e) ? e.reduce((n, s) => (n.keys.push(s.key), n.operations.push(s.type), n.oldValue[s.key] = s.oldValue, n.newValue[s.key] = s.newValue, n), {
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
function Tt(e) {
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
let M = !0;
const Z = [], T = "pinia:mutations", h = "pinia", { assign: Vt } = Object, ee = (e) => "🍍 " + e;
function kt(e, n) {
  je({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: Z,
    app: e
  }, (s) => {
    typeof s.now != "function" && _("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), s.addTimelineLayer({
      id: T,
      label: "Pinia 🍍",
      color: 15064968
    }), s.addInspector({
      id: h,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Et(n);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await St(n), s.sendInspectorTree(h), s.sendInspectorState(h);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            wt(n);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await It(n), s.sendInspectorTree(h), s.sendInspectorState(h);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: "Reset the state (option store only)",
          action: (t) => {
            const r = n._s.get(t);
            r ? r._isOptionsAPI ? (r.$reset(), _(`Store "${t}" reset.`)) : _(`Cannot reset "${t}" store because it's a setup store.`, "warn") : _(`Cannot reset "${t}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), s.on.inspectComponent((t, r) => {
      const a = t.componentInstance && t.componentInstance.proxy;
      if (a && a._pStores) {
        const o = t.componentInstance.proxy._pStores;
        Object.values(o).forEach((i) => {
          t.instanceData.state.push({
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
              Object.keys(i.$state).reduce((l, f) => (l[f] = i.$state[f], l), {})
            )
          }), i._getters && i._getters.length && t.instanceData.state.push({
            type: ee(i.$id),
            key: "getters",
            editable: !1,
            value: i._getters.reduce((l, f) => {
              try {
                l[f] = i[f];
              } catch (p) {
                l[f] = p;
              }
              return l;
            }, {})
          });
        });
      }
    }), s.on.getInspectorTree((t) => {
      if (t.app === e && t.inspectorId === h) {
        let r = [n];
        r = r.concat(Array.from(n._s.values())), t.rootNodes = (t.filter ? r.filter((a) => "$id" in a ? a.$id.toLowerCase().includes(t.filter.toLowerCase()) : Fe.toLowerCase().includes(t.filter.toLowerCase())) : r).map(Nt);
      }
    }), s.on.getInspectorState((t) => {
      if (t.app === e && t.inspectorId === h) {
        const r = t.nodeId === ie ? n : n._s.get(t.nodeId);
        if (!r)
          return;
        r && (t.state = $t(r));
      }
    }), s.on.editInspectorState((t, r) => {
      if (t.app === e && t.inspectorId === h) {
        const a = t.nodeId === ie ? n : n._s.get(t.nodeId);
        if (!a)
          return _(`store "${t.nodeId}" not found`, "error");
        const { path: o } = t;
        ue(a) ? o.unshift("state") : (o.length !== 1 || !a._customProperties.has(o[0]) || o[0] in a.$state) && o.unshift("$state"), M = !1, t.set(a, o, t.state.value), M = !0;
      }
    }), s.on.editComponentState((t) => {
      if (t.type.startsWith("🍍")) {
        const r = t.type.replace(/^🍍\s*/, ""), a = n._s.get(r);
        if (!a)
          return _(`store "${r}" not found`, "error");
        const { path: o } = t;
        if (o[0] !== "state")
          return _(`Invalid path for store "${r}":
${o}
Only state can be modified.`);
        o[0] = "$state", M = !1, t.set(a, o, t.state.value), M = !0;
      }
    });
  });
}
function At(e, n) {
  Z.includes(ee(n.$id)) || Z.push(ee(n.$id)), je({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: Z,
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
  }, (s) => {
    const t = typeof s.now == "function" ? s.now.bind(s) : Date.now;
    n.$onAction(({ after: o, onError: i, name: l, args: f }) => {
      const p = He++;
      s.addTimelineEvent({
        layerId: T,
        event: {
          time: t(),
          title: "🛫 " + l,
          subtitle: "start",
          data: {
            store: S(n.$id),
            action: S(l),
            args: f
          },
          groupId: p
        }
      }), o((m) => {
        k = void 0, s.addTimelineEvent({
          layerId: T,
          event: {
            time: t(),
            title: "🛬 " + l,
            subtitle: "end",
            data: {
              store: S(n.$id),
              action: S(l),
              args: f,
              result: m
            },
            groupId: p
          }
        });
      }), i((m) => {
        k = void 0, s.addTimelineEvent({
          layerId: T,
          event: {
            time: t(),
            logType: "error",
            title: "💥 " + l,
            subtitle: "end",
            data: {
              store: S(n.$id),
              action: S(l),
              args: f,
              error: m
            },
            groupId: p
          }
        });
      });
    }, !0), n._customProperties.forEach((o) => {
      Ve(() => et(n[o]), (i, l) => {
        s.notifyComponentUpdate(), s.sendInspectorState(h), M && s.addTimelineEvent({
          layerId: T,
          event: {
            time: t(),
            title: "Change",
            subtitle: o,
            data: {
              newValue: i,
              oldValue: l
            },
            groupId: k
          }
        });
      }, { deep: !0 });
    }), n.$subscribe(({ events: o, type: i }, l) => {
      if (s.notifyComponentUpdate(), s.sendInspectorState(h), !M)
        return;
      const f = {
        time: t(),
        title: Tt(i),
        data: Vt({ store: S(n.$id) }, Pt(o)),
        groupId: k
      };
      k = void 0, i === O.patchFunction ? f.subtitle = "⤵️" : i === O.patchObject ? f.subtitle = "🧩" : o && !Array.isArray(o) && (f.subtitle = o.type), o && (f.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: o
        }
      }), s.addTimelineEvent({
        layerId: T,
        event: f
      });
    }, { detached: !0, flush: "sync" });
    const r = n._hotUpdate;
    n._hotUpdate = N((o) => {
      r(o), s.addTimelineEvent({
        layerId: T,
        event: {
          time: t(),
          title: "🔥 " + n.$id,
          subtitle: "HMR update",
          data: {
            store: S(n.$id),
            info: S("HMR update")
          }
        }
      }), s.notifyComponentUpdate(), s.sendInspectorTree(h), s.sendInspectorState(h);
    });
    const { $dispose: a } = n;
    n.$dispose = () => {
      a(), s.notifyComponentUpdate(), s.sendInspectorTree(h), s.sendInspectorState(h), s.getSettings().logStoreChanges && _(`Disposed "${n.$id}" store 🗑`);
    }, s.notifyComponentUpdate(), s.sendInspectorTree(h), s.sendInspectorState(h), s.getSettings().logStoreChanges && _(`"${n.$id}" store installed 🆕`);
  });
}
let He = 0, k;
function we(e, n) {
  const s = n.reduce((t, r) => (t[r] = W(e)[r], t), {});
  for (const t in s)
    e[t] = function() {
      const r = He, a = new Proxy(e, {
        get(...o) {
          return k = r, Reflect.get(...o);
        },
        set(...o) {
          return k = r, Reflect.set(...o);
        }
      });
      return s[t].apply(a, arguments);
    };
}
function Dt({ app: e, store: n, options: s }) {
  if (!n.$id.startsWith("__hot:")) {
    if (s.state && (n._isOptionsAPI = !0), typeof s.state == "function") {
      we(
        // @ts-expect-error: can cast the store...
        n,
        Object.keys(s.actions)
      );
      const t = n._hotUpdate;
      W(n)._hotUpdate = function(r) {
        t.apply(this, arguments), we(n, Object.keys(r._hmrPayload.actions));
      };
    }
    At(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      n
    );
  }
}
function jt() {
  const e = Te(!0), n = e.run(() => G({}));
  let s = [], t = [];
  const r = N({
    install(a) {
      B(r), r._a = a, a.provide(Ce, r), a.config.globalProperties.$pinia = r, H && kt(a, r), t.forEach((o) => s.push(o)), t = [];
    },
    use(a) {
      return !this._a && !Ae ? t.push(a) : s.push(a), this;
    },
    _p: s,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: n
  });
  return H && typeof Proxy < "u" && r.use(Dt), r;
}
function Ge(e, n) {
  for (const s in n) {
    const t = n[s];
    if (!(s in e))
      continue;
    const r = e[s];
    A(r) && A(t) && !R(t) && !te(t) ? e[s] = Ge(r, t) : e[s] = t;
  }
  return e;
}
const Be = () => {
};
function Oe(e, n, s, t = Be) {
  e.push(n);
  const r = () => {
    const a = e.indexOf(n);
    a > -1 && (e.splice(a, 1), t());
  };
  return !s && st() && nt(r), r;
}
function C(e, ...n) {
  e.slice().forEach((s) => {
    s(...n);
  });
}
function ae(e, n) {
  e instanceof Map && n instanceof Map && n.forEach((s, t) => e.set(t, s)), e instanceof Set && n instanceof Set && n.forEach(e.add, e);
  for (const s in n) {
    if (!n.hasOwnProperty(s))
      continue;
    const t = n[s], r = e[s];
    A(r) && A(t) && e.hasOwnProperty(s) && !R(t) && !te(t) ? e[s] = ae(r, t) : e[s] = t;
  }
  return e;
}
const Ct = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Lt(e) {
  return !A(e) || !e.hasOwnProperty(Ct);
}
const { assign: E } = Object;
function Ie(e) {
  return !!(R(e) && e.effect);
}
function Ne(e, n, s, t) {
  const { state: r, actions: a, getters: o } = n, i = s.state.value[e];
  let l;
  function f() {
    !i && (process.env.NODE_ENV === "production" || !t) && (s.state.value[e] = r ? r() : {});
    const p = process.env.NODE_ENV !== "production" && t ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      _e(G(r ? r() : {}).value)
    ) : _e(s.state.value[e]);
    return E(p, a, Object.keys(o || {}).reduce((m, v) => (process.env.NODE_ENV !== "production" && v in p && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${v}" in store "${e}".`), m[v] = N(K(() => {
      B(s);
      const w = s._s.get(e);
      return o[v].call(w, w);
    })), m), {}));
  }
  return l = ce(e, f, n, s, t, !0), l;
}
function ce(e, n, s = {}, t, r, a) {
  let o;
  const i = E({ actions: {} }, s);
  if (process.env.NODE_ENV !== "production" && !t._e.active)
    throw new Error("Pinia destroyed");
  const l = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Ae && (l.onTrigger = (u) => {
    f ? w = u : f == !1 && !d._hotUpdating && (Array.isArray(w) ? w.push(u) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let f, p, m = N([]), v = N([]), w;
  const D = t.state.value[e];
  !a && !D && (process.env.NODE_ENV === "production" || !r) && (t.state.value[e] = {});
  const ne = G({});
  let fe;
  function de(u) {
    let c;
    f = p = !1, process.env.NODE_ENV !== "production" && (w = []), typeof u == "function" ? (u(t.state.value[e]), c = {
      type: O.patchFunction,
      storeId: e,
      events: w
    }) : (ae(t.state.value[e], u), c = {
      type: O.patchObject,
      payload: u,
      storeId: e,
      events: w
    });
    const g = fe = Symbol();
    me().then(() => {
      fe === g && (f = !0);
    }), p = !0, C(m, c, t.state.value[e]);
  }
  const ze = a ? function() {
    const { state: c } = s, g = c ? c() : {};
    this.$patch((y) => {
      E(y, g);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : Be
  );
  function Ye() {
    o.stop(), m = [], v = [], t._s.delete(e);
  }
  function ge(u, c) {
    return function() {
      B(t);
      const g = Array.from(arguments), y = [], U = [];
      function qe(b) {
        y.push(b);
      }
      function Xe(b) {
        U.push(b);
      }
      C(v, {
        args: g,
        name: u,
        store: d,
        after: qe,
        onError: Xe
      });
      let x;
      try {
        x = c.apply(this && this.$id === e ? this : d, g);
      } catch (b) {
        throw C(U, b), b;
      }
      return x instanceof Promise ? x.then((b) => (C(y, b), b)).catch((b) => (C(U, b), Promise.reject(b))) : (C(y, x), x);
    };
  }
  const J = /* @__PURE__ */ N({
    actions: {},
    getters: {},
    state: [],
    hotState: ne
  }), pe = {
    _p: t,
    // _s: scope,
    $id: e,
    $onAction: Oe.bind(null, v),
    $patch: de,
    $reset: ze,
    $subscribe(u, c = {}) {
      const g = Oe(m, u, c.detached, () => y()), y = o.run(() => Ve(() => t.state.value[e], (U) => {
        (c.flush === "sync" ? p : f) && u({
          storeId: e,
          type: O.direct,
          events: w
        }, U);
      }, E({}, l, c)));
      return g;
    },
    $dispose: Ye
  }, d = tt(process.env.NODE_ENV !== "production" || H ? E(
    {
      _hmrPayload: J,
      _customProperties: N(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    pe
    // must be added later
    // setupStore
  ) : pe);
  t._s.set(e, d);
  const $ = t._e.run(() => (o = Te(), o.run(() => n())));
  for (const u in $) {
    const c = $[u];
    if (R(c) && !Ie(c) || te(c))
      process.env.NODE_ENV !== "production" && r ? Q(ne.value, u, z($, u)) : a || (D && Lt(c) && (R(c) ? c.value = D[u] : ae(c, D[u])), t.state.value[e][u] = c), process.env.NODE_ENV !== "production" && J.state.push(u);
    else if (typeof c == "function") {
      const g = process.env.NODE_ENV !== "production" && r ? c : ge(u, c);
      $[u] = g, process.env.NODE_ENV !== "production" && (J.actions[u] = c), i.actions[u] = c;
    } else
      process.env.NODE_ENV !== "production" && Ie(c) && (J.getters[u] = a ? (
        // @ts-expect-error
        s.getters[u]
      ) : c, se && ($._getters || // @ts-expect-error: same
      ($._getters = N([]))).push(u));
  }
  if (E(d, $), E(W(d), $), Object.defineProperty(d, "$state", {
    get: () => process.env.NODE_ENV !== "production" && r ? ne.value : t.state.value[e],
    set: (u) => {
      if (process.env.NODE_ENV !== "production" && r)
        throw new Error("cannot set hotState");
      de((c) => {
        E(c, u);
      });
    }
  }), process.env.NODE_ENV !== "production" && (d._hotUpdate = N((u) => {
    d._hotUpdating = !0, u._hmrPayload.state.forEach((c) => {
      if (c in d.$state) {
        const g = u.$state[c], y = d.$state[c];
        typeof g == "object" && A(g) && A(y) ? Ge(g, y) : u.$state[c] = y;
      }
      Q(d, c, z(u.$state, c));
    }), Object.keys(d.$state).forEach((c) => {
      c in u.$state || oe(d, c);
    }), f = !1, p = !1, t.state.value[e] = z(u._hmrPayload, "hotState"), p = !0, me().then(() => {
      f = !0;
    });
    for (const c in u._hmrPayload.actions) {
      const g = u[c];
      Q(d, c, ge(c, g));
    }
    for (const c in u._hmrPayload.getters) {
      const g = u._hmrPayload.getters[c], y = a ? (
        // special handling of options api
        K(() => (B(t), g.call(d, d)))
      ) : g;
      Q(d, c, y);
    }
    Object.keys(d._hmrPayload.getters).forEach((c) => {
      c in u._hmrPayload.getters || oe(d, c);
    }), Object.keys(d._hmrPayload.actions).forEach((c) => {
      c in u._hmrPayload.actions || oe(d, c);
    }), d._hmrPayload = u._hmrPayload, d._getters = u._getters, d._hotUpdating = !1;
  })), H) {
    const u = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((c) => {
      Object.defineProperty(d, c, E({ value: d[c] }, u));
    });
  }
  return t._p.forEach((u) => {
    if (H) {
      const c = o.run(() => u({
        store: d,
        app: t._a,
        pinia: t,
        options: i
      }));
      Object.keys(c || {}).forEach((g) => d._customProperties.add(g)), E(d, c);
    } else
      E(d, o.run(() => u({
        store: d,
        app: t._a,
        pinia: t,
        options: i
      })));
  }), process.env.NODE_ENV !== "production" && d.$state && typeof d.$state == "object" && typeof d.$state.constructor == "function" && !d.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${d.$id}".`), D && a && s.hydrate && s.hydrate(d.$state, D), f = !0, p = !0, d;
}
function Mt(e, n, s) {
  let t, r;
  const a = typeof n == "function";
  typeof e == "string" ? (t = e, r = a ? s : n) : (r = e, t = e.id);
  function o(i, l) {
    const f = Ze();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && F && F._testing ? null : i) || f && Ke(Ce, null), i && B(i), process.env.NODE_ENV !== "production" && !F)
      throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
    i = F, i._s.has(t) || (a ? ce(t, n, r, i) : Ne(t, r, i), process.env.NODE_ENV !== "production" && (o._pinia = i));
    const p = i._s.get(t);
    if (process.env.NODE_ENV !== "production" && l) {
      const m = "__hot:" + t, v = a ? ce(m, n, r, i, !0) : Ne(m, E({}, r), i, !0);
      l._hotUpdate(v), delete i.state.value[m], i._s.delete(m);
    }
    if (process.env.NODE_ENV !== "production" && se && f && f.proxy && // avoid adding stores that are just built for hot module replacement
    !l) {
      const m = f.proxy, v = "_pStores" in m ? m._pStores : m._pStores = {};
      v[t] = p;
    }
    return p;
  }
  return o.$id = t, o;
}
function Rt(e) {
  {
    e = W(e);
    const n = {};
    for (const s in e) {
      const t = e[s];
      (R(t) || te(t)) && (n[s] = // ---
      z(e, s));
    }
    return n;
  }
}
const $e = {
  body: "Wait please ..",
  type: "wait",
  id: "default"
}, Ut = (e, n) => !n.find((s) => s.type === e.type && s.id === e.id), We = Mt("messages", () => {
  const e = G([]), n = G("top-right");
  function s(o) {
    Ut(o, e.value) && (o.type == "wait" ? e.value.unshift(o) : e.value.push(o), o.duration && setTimeout(() => t(o.id), o.duration));
  }
  function t(o) {
    e.value = e.value.filter(
      (i) => i.id !== o
    );
  }
  function r(o) {
    o ? o.type === "wait" && s(o) : s($e);
  }
  function a(o) {
    t(o || $e.id);
  }
  return {
    messages: e,
    position: n,
    removeMessage: t,
    newMessage: s,
    startWait: r,
    stopWait: a
  };
}), Pe = (e) => Array.isArray(e) ? e.join(" ") : e, xt = ke({
  name: "MessageItem",
  props: {
    message: {
      required: !0,
      type: Object
    }
  },
  emits: {
    remove: (e) => e
  },
  setup(e, n) {
    function s(i) {
      n.emit("remove", i);
    }
    function t(i) {
      if (i && typeof i == "object")
        return Pe(i.class);
    }
    function r(i) {
      return i && typeof i == "object" ? i.value : i;
    }
    const a = K(() => e.message.type === "success" ? "&#10003;" : e.message.type === "warning" ? "!" : ""), o = K(
      () => typeof e.message.body == "object" && typeof e.message.body.value == "string" || typeof e.message.body == "string"
    );
    return {
      removeMessage: s,
      getMessageClass: Pe,
      getFieldValue: r,
      getFieldClassList: t,
      getMessageImgBlockContent: a,
      isShowMessageContent: o
    };
  }
});
const Je = (e, n) => {
  const s = e.__vccOpts || e;
  for (const [t, r] of n)
    s[t] = r;
  return s;
}, Ft = ["data-message-type"], Ht = { class: "message__img" }, Gt = ["data-testid", "innerHTML"], Bt = ["src"], Wt = {
  class: /* @__PURE__ */ V("message__title"),
  "data-testid": "message__title-block"
};
function Jt(e, n, s, t, r, a) {
  return P(), L("li", {
    "data-testid": "message__item",
    class: V(`message__item message__item--${e.message.type} ${e.getMessageClass(
      e.message.class
    )}`),
    "data-message-type": e.message.type
  }, [
    he("div", Ht, [
      Y(e.$slots, `message__img-${e.message.type}`, { item: e.message }, () => [
        e.message.img ? (P(), L("img", {
          key: 1,
          src: e.getFieldValue(e.message.img),
          class: V(`message__img-custom ${e.getFieldClassList(e.message.img)}`),
          "data-testid": "message__img-custom",
          alt: "message avatar"
        }, null, 10, Bt)) : (P(), L("div", {
          key: 0,
          "data-testid": `message__img-block-${e.message.type}`,
          class: V(`message__img-${e.message.type}`),
          innerHTML: e.getMessageImgBlockContent
        }, null, 10, Gt))
      ], !0)
    ]),
    he("div", Wt, [
      Y(e.$slots, `message__title-${e.message.type}`, {
        item: { ...e.message }
      }, () => [
        e.isShowMessageContent ? (P(), L("p", {
          key: 0,
          class: V(`message__title-content ${e.getFieldClassList(e.message.body)}`),
          "data-testid": "message__title-content"
        }, ot(e.getFieldValue(e.message.body)), 3)) : ye("", !0)
      ], !0)
    ]),
    e.message.type !== "wait" ? (P(), L("button", {
      key: 0,
      type: "button",
      class: V("message__close"),
      "data-testid": "message__close-button",
      onClick: n[0] || (n[0] = (o) => e.removeMessage(e.message))
    }, [
      Y(e.$slots, "message__delete-btn", {}, () => [
        rt(" × ")
      ], !0)
    ])) : ye("", !0)
  ], 10, Ft);
}
const Qt = /* @__PURE__ */ Je(xt, [["render", Jt], ["__scopeId", "data-v-99167941"]]), zt = ke({
  name: "MessageList",
  components: {
    MessageItem: Qt
  },
  setup() {
    const e = We(), { messages: n, position: s } = Rt(e);
    function t(r) {
      e.removeMessage(r.id);
    }
    return {
      messages: n,
      removeMessage: t,
      position: s
    };
  }
});
function Yt(e, n, s, t, r, a) {
  const o = it("MessageItem");
  return P(), ve(at, {
    name: "list",
    tag: "ul",
    class: V(["message__list", `message__list--${e.position}`])
  }, {
    default: be(() => [
      (P(!0), L(ct, null, Ee(e.messages, (i) => (P(), ve(o, {
        key: i.id,
        message: i,
        onRemove: e.removeMessage
      }, lt({ _: 2 }, [
        Ee(e.$slots, (l, f) => ({
          name: f,
          fn: be((p) => [
            Y(e.$slots, f, {
              item: { ...p }
            }, void 0, !0)
          ])
        }))
      ]), 1032, ["message", "onRemove"]))), 128))
    ]),
    _: 3
  }, 8, ["class"]);
}
const Qe = /* @__PURE__ */ Je(zt, [["render", Yt], ["__scopeId", "data-v-0007e307"]]);
function qt(e) {
  return { ...e, id: Date.now().toString() };
}
const Xt = {
  install: (e, n) => {
    const s = We();
    n != null && n.position && (s.position = n.position);
    function t(l) {
      const f = qt(l);
      s.newMessage(f);
    }
    function r(l) {
      s.removeMessage(l);
    }
    function a(l) {
      s.startWait(l);
    }
    function o(l) {
      s.stopWait(l);
    }
    const i = {
      addNewMessage: t,
      removeMessage: r,
      startWait: a,
      stopWait: o
    };
    e.provide("message", i), e.component("VMessage", Qe), e.config.globalProperties.$message = i;
  }
}, Kt = {
  install: (e, n) => {
    e.component("AppMessages", Qe);
    const s = jt();
    e.use(s), e.use(Xt, n);
  }
};
export {
  Kt as default
};
