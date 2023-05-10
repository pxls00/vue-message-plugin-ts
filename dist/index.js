import { effectScope as De, ref as j, markRaw as P, toRaw as Q, isRef as U, isReactive as te, toRef as q, getCurrentInstance as st, inject as nt, watch as ke, unref as m, reactive as ot, nextTick as Ee, computed as me, getCurrentScope as rt, onScopeDispose as it, toRefs as Se, defineComponent as se, useCssModule as je, openBlock as T, createElementBlock as H, normalizeClass as V, createElementVNode as re, renderSlot as B, toDisplayString as Oe, createTextVNode as at, createCommentVNode as Le, createBlock as ie, TransitionGroup as ct, withCtx as ae, createSlots as Ne, renderList as ce, Fragment as lt } from "vue";
var Ce = !1;
function Y(e, n, t) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, n), e.splice(n, 1, t), t) : (e[n] = t, t);
}
function le(e, n) {
  if (Array.isArray(e)) {
    e.splice(n, 1);
    return;
  }
  delete e[n];
}
function ut() {
  return Me().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Me() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const ft = typeof Proxy == "function", dt = "devtools-plugin:setup", _t = "plugin:settings:set";
let C, fe;
function gt() {
  var e;
  return C !== void 0 || (typeof window < "u" && window.performance ? (C = !0, fe = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (C = !0, fe = global.perf_hooks.performance) : C = !1), C;
}
function mt() {
  return gt() ? fe.now() : Date.now();
}
class pt {
  constructor(n, t) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = n, this.hook = t;
    const s = {};
    if (n.settings)
      for (const r in n.settings) {
        const i = n.settings[r];
        s[r] = i.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${n.id}`;
    let a = Object.assign({}, s);
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
    }, t && t.on(_t, (r, i) => {
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
  async setRealTarget(n) {
    this.target = n;
    for (const t of this.onQueue)
      this.target.on[t.method](...t.args);
    for (const t of this.targetQueue)
      t.resolve(await this.target[t.method](...t.args));
  }
}
function xe(e, n) {
  const t = e, s = Me(), o = ut(), a = ft && t.enableEarlyProxy;
  if (o && (s.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    o.emit(dt, e, n);
  else {
    const r = a ? new pt(t, o) : null;
    (s.__VUE_DEVTOOLS_PLUGINS__ = s.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: t,
      setupFn: n,
      proxy: r
    }), r && n(r.proxiedTarget);
  }
}
/*!
  * pinia v2.0.33
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let G;
const W = (e) => G = e, Ue = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function L(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var N;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(N || (N = {}));
const ne = typeof window < "u", J = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && ne, Ie = /* @__PURE__ */ (() => typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null })();
function ht(e, { autoBom: n = !1 } = {}) {
  return n && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e], { type: e.type }) : e;
}
function pe(e, n, t) {
  const s = new XMLHttpRequest();
  s.open("GET", e), s.responseType = "blob", s.onload = function() {
    He(s.response, n, t);
  }, s.onerror = function() {
    console.error("could not download file");
  }, s.send();
}
function Re(e) {
  const n = new XMLHttpRequest();
  n.open("HEAD", e, !1);
  try {
    n.send();
  } catch {
  }
  return n.status >= 200 && n.status <= 299;
}
function X(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const t = document.createEvent("MouseEvents");
    t.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(t);
  }
}
const Z = typeof navigator == "object" ? navigator : { userAgent: "" }, Fe = /* @__PURE__ */ (() => /Macintosh/.test(Z.userAgent) && /AppleWebKit/.test(Z.userAgent) && !/Safari/.test(Z.userAgent))(), He = ne ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Fe ? yt : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in Z ? vt : (
      // Fallback to using FileReader and a popup
      wt
    )
  )
) : () => {
};
function yt(e, n = "download", t) {
  const s = document.createElement("a");
  s.download = n, s.rel = "noopener", typeof e == "string" ? (s.href = e, s.origin !== location.origin ? Re(s.href) ? pe(e, n, t) : (s.target = "_blank", X(s)) : X(s)) : (s.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(s.href);
  }, 4e4), setTimeout(function() {
    X(s);
  }, 0));
}
function vt(e, n = "download", t) {
  if (typeof e == "string")
    if (Re(e))
      pe(e, n, t);
    else {
      const s = document.createElement("a");
      s.href = e, s.target = "_blank", setTimeout(function() {
        X(s);
      });
    }
  else
    navigator.msSaveOrOpenBlob(ht(e, t), n);
}
function wt(e, n, t, s) {
  if (s = s || open("", "_blank"), s && (s.document.title = s.document.body.innerText = "downloading..."), typeof e == "string")
    return pe(e, n, t);
  const o = e.type === "application/octet-stream", a = /constructor/i.test(String(Ie.HTMLElement)) || "safari" in Ie, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || o && a || Fe) && typeof FileReader < "u") {
    const i = new FileReader();
    i.onloadend = function() {
      let c = i.result;
      if (typeof c != "string")
        throw s = null, new Error("Wrong reader.result type");
      c = r ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), s ? s.location.href = c : location.assign(c), s = null;
    }, i.readAsDataURL(e);
  } else {
    const i = URL.createObjectURL(e);
    s ? s.location.assign(i) : location.href = i, s = null, setTimeout(function() {
      URL.revokeObjectURL(i);
    }, 4e4);
  }
}
function h(e, n) {
  const t = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(t, n) : n === "error" ? console.error(t) : n === "warn" ? console.warn(t) : console.log(t);
}
function he(e) {
  return "_a" in e && "install" in e;
}
function Ge() {
  if (!("clipboard" in navigator))
    return h("Your browser doesn't support the Clipboard API", "error"), !0;
}
function Be(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (h('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function bt(e) {
  if (!Ge())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), h("Global state copied to clipboard.");
    } catch (n) {
      if (Be(n))
        return;
      h("Failed to serialize the state. Check the console for more details.", "error"), console.error(n);
    }
}
async function Et(e) {
  if (!Ge())
    try {
      e.state.value = JSON.parse(await navigator.clipboard.readText()), h("Global state pasted from clipboard.");
    } catch (n) {
      if (Be(n))
        return;
      h("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(n);
    }
}
async function St(e) {
  try {
    He(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (n) {
    h("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(n);
  }
}
let I;
function Ot() {
  I || (I = document.createElement("input"), I.type = "file", I.accept = ".json");
  function e() {
    return new Promise((n, t) => {
      I.onchange = async () => {
        const s = I.files;
        if (!s)
          return n(null);
        const o = s.item(0);
        return n(o ? { text: await o.text(), file: o } : null);
      }, I.oncancel = () => n(null), I.onerror = t, I.click();
    });
  }
  return e;
}
async function Nt(e) {
  try {
    const t = await (await Ot())();
    if (!t)
      return;
    const { text: s, file: o } = t;
    e.state.value = JSON.parse(s), h(`Global state imported from "${o.name}".`);
  } catch (n) {
    h("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(n);
  }
}
function O(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const Je = "🍍 Pinia (root)", de = "_root";
function It(e) {
  return he(e) ? {
    id: de,
    label: Je
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Pt(e) {
  if (he(e)) {
    const t = Array.from(e._s.keys()), s = e._s;
    return {
      state: t.map((a) => ({
        editable: !0,
        key: a,
        value: e.state.value[a]
      })),
      getters: t.filter((a) => s.get(a)._getters).map((a) => {
        const r = s.get(a);
        return {
          editable: !1,
          key: a,
          value: r._getters.reduce((i, c) => (i[c] = r[c], i), {})
        };
      })
    };
  }
  const n = {
    state: Object.keys(e.$state).map((t) => ({
      editable: !0,
      key: t,
      value: e.$state[t]
    }))
  };
  return e._getters && e._getters.length && (n.getters = e._getters.map((t) => ({
    editable: !1,
    key: t,
    value: e[t]
  }))), e._customProperties.size && (n.customProperties = Array.from(e._customProperties).map((t) => ({
    editable: !0,
    key: t,
    value: e[t]
  }))), n;
}
function $t(e) {
  return e ? Array.isArray(e) ? e.reduce((n, t) => (n.keys.push(t.key), n.operations.push(t.type), n.oldValue[t.key] = t.oldValue, n.newValue[t.key] = t.newValue, n), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: O(e.type),
    key: O(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function At(e) {
  switch (e) {
    case N.direct:
      return "mutation";
    case N.patchFunction:
      return "$patch";
    case N.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let x = !0;
const K = [], D = "pinia:mutations", v = "pinia", { assign: Tt } = Object, ee = (e) => "🍍 " + e;
function Vt(e, n) {
  xe({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: K,
    app: e
  }, (t) => {
    typeof t.now != "function" && h("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), t.addTimelineLayer({
      id: D,
      label: "Pinia 🍍",
      color: 15064968
    }), t.addInspector({
      id: v,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            bt(n);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Et(n), t.sendInspectorTree(v), t.sendInspectorState(v);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            St(n);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Nt(n), t.sendInspectorTree(v), t.sendInspectorState(v);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: "Reset the state (option store only)",
          action: (s) => {
            const o = n._s.get(s);
            o ? o._isOptionsAPI ? (o.$reset(), h(`Store "${s}" reset.`)) : h(`Cannot reset "${s}" store because it's a setup store.`, "warn") : h(`Cannot reset "${s}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), t.on.inspectComponent((s, o) => {
      const a = s.componentInstance && s.componentInstance.proxy;
      if (a && a._pStores) {
        const r = s.componentInstance.proxy._pStores;
        Object.values(r).forEach((i) => {
          s.instanceData.state.push({
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
          }), i._getters && i._getters.length && s.instanceData.state.push({
            type: ee(i.$id),
            key: "getters",
            editable: !1,
            value: i._getters.reduce((c, f) => {
              try {
                c[f] = i[f];
              } catch (p) {
                c[f] = p;
              }
              return c;
            }, {})
          });
        });
      }
    }), t.on.getInspectorTree((s) => {
      if (s.app === e && s.inspectorId === v) {
        let o = [n];
        o = o.concat(Array.from(n._s.values())), s.rootNodes = (s.filter ? o.filter((a) => "$id" in a ? a.$id.toLowerCase().includes(s.filter.toLowerCase()) : Je.toLowerCase().includes(s.filter.toLowerCase())) : o).map(It);
      }
    }), t.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === v) {
        const o = s.nodeId === de ? n : n._s.get(s.nodeId);
        if (!o)
          return;
        o && (s.state = Pt(o));
      }
    }), t.on.editInspectorState((s, o) => {
      if (s.app === e && s.inspectorId === v) {
        const a = s.nodeId === de ? n : n._s.get(s.nodeId);
        if (!a)
          return h(`store "${s.nodeId}" not found`, "error");
        const { path: r } = s;
        he(a) ? r.unshift("state") : (r.length !== 1 || !a._customProperties.has(r[0]) || r[0] in a.$state) && r.unshift("$state"), x = !1, s.set(a, r, s.state.value), x = !0;
      }
    }), t.on.editComponentState((s) => {
      if (s.type.startsWith("🍍")) {
        const o = s.type.replace(/^🍍\s*/, ""), a = n._s.get(o);
        if (!a)
          return h(`store "${o}" not found`, "error");
        const { path: r } = s;
        if (r[0] !== "state")
          return h(`Invalid path for store "${o}":
${r}
Only state can be modified.`);
        r[0] = "$state", x = !1, s.set(a, r, s.state.value), x = !0;
      }
    });
  });
}
function Dt(e, n) {
  K.includes(ee(n.$id)) || K.push(ee(n.$id)), xe({
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
    const s = typeof t.now == "function" ? t.now.bind(t) : Date.now;
    n.$onAction(({ after: r, onError: i, name: c, args: f }) => {
      const p = We++;
      t.addTimelineEvent({
        layerId: D,
        event: {
          time: s(),
          title: "🛫 " + c,
          subtitle: "start",
          data: {
            store: O(n.$id),
            action: O(c),
            args: f
          },
          groupId: p
        }
      }), r((_) => {
        k = void 0, t.addTimelineEvent({
          layerId: D,
          event: {
            time: s(),
            title: "🛬 " + c,
            subtitle: "end",
            data: {
              store: O(n.$id),
              action: O(c),
              args: f,
              result: _
            },
            groupId: p
          }
        });
      }), i((_) => {
        k = void 0, t.addTimelineEvent({
          layerId: D,
          event: {
            time: s(),
            logType: "error",
            title: "💥 " + c,
            subtitle: "end",
            data: {
              store: O(n.$id),
              action: O(c),
              args: f,
              error: _
            },
            groupId: p
          }
        });
      });
    }, !0), n._customProperties.forEach((r) => {
      ke(() => m(n[r]), (i, c) => {
        t.notifyComponentUpdate(), t.sendInspectorState(v), x && t.addTimelineEvent({
          layerId: D,
          event: {
            time: s(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: i,
              oldValue: c
            },
            groupId: k
          }
        });
      }, { deep: !0 });
    }), n.$subscribe(({ events: r, type: i }, c) => {
      if (t.notifyComponentUpdate(), t.sendInspectorState(v), !x)
        return;
      const f = {
        time: s(),
        title: At(i),
        data: Tt({ store: O(n.$id) }, $t(r)),
        groupId: k
      };
      k = void 0, i === N.patchFunction ? f.subtitle = "⤵️" : i === N.patchObject ? f.subtitle = "🧩" : r && !Array.isArray(r) && (f.subtitle = r.type), r && (f.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: r
        }
      }), t.addTimelineEvent({
        layerId: D,
        event: f
      });
    }, { detached: !0, flush: "sync" });
    const o = n._hotUpdate;
    n._hotUpdate = P((r) => {
      o(r), t.addTimelineEvent({
        layerId: D,
        event: {
          time: s(),
          title: "🔥 " + n.$id,
          subtitle: "HMR update",
          data: {
            store: O(n.$id),
            info: O("HMR update")
          }
        }
      }), t.notifyComponentUpdate(), t.sendInspectorTree(v), t.sendInspectorState(v);
    });
    const { $dispose: a } = n;
    n.$dispose = () => {
      a(), t.notifyComponentUpdate(), t.sendInspectorTree(v), t.sendInspectorState(v), t.getSettings().logStoreChanges && h(`Disposed "${n.$id}" store 🗑`);
    }, t.notifyComponentUpdate(), t.sendInspectorTree(v), t.sendInspectorState(v), t.getSettings().logStoreChanges && h(`"${n.$id}" store installed 🆕`);
  });
}
let We = 0, k;
function Pe(e, n) {
  const t = n.reduce((s, o) => (s[o] = Q(e)[o], s), {});
  for (const s in t)
    e[s] = function() {
      const o = We, a = new Proxy(e, {
        get(...r) {
          return k = o, Reflect.get(...r);
        },
        set(...r) {
          return k = o, Reflect.set(...r);
        }
      });
      return t[s].apply(a, arguments);
    };
}
function kt({ app: e, store: n, options: t }) {
  if (!n.$id.startsWith("__hot:")) {
    if (t.state && (n._isOptionsAPI = !0), typeof t.state == "function") {
      Pe(
        // @ts-expect-error: can cast the store...
        n,
        Object.keys(t.actions)
      );
      const s = n._hotUpdate;
      Q(n)._hotUpdate = function(o) {
        s.apply(this, arguments), Pe(n, Object.keys(o._hmrPayload.actions));
      };
    }
    Dt(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      n
    );
  }
}
function jt() {
  const e = De(!0), n = e.run(() => j({}));
  let t = [], s = [];
  const o = P({
    install(a) {
      W(o), o._a = a, a.provide(Ue, o), a.config.globalProperties.$pinia = o, J && Vt(a, o), s.forEach((r) => t.push(r)), s = [];
    },
    use(a) {
      return !this._a && !Ce ? s.push(a) : t.push(a), this;
    },
    _p: t,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: n
  });
  return J && typeof Proxy < "u" && o.use(kt), o;
}
function Qe(e, n) {
  for (const t in n) {
    const s = n[t];
    if (!(t in e))
      continue;
    const o = e[t];
    L(o) && L(s) && !U(s) && !te(s) ? e[t] = Qe(o, s) : e[t] = s;
  }
  return e;
}
const ze = () => {
};
function $e(e, n, t, s = ze) {
  e.push(n);
  const o = () => {
    const a = e.indexOf(n);
    a > -1 && (e.splice(a, 1), s());
  };
  return !t && rt() && it(o), o;
}
function M(e, ...n) {
  e.slice().forEach((t) => {
    t(...n);
  });
}
function _e(e, n) {
  e instanceof Map && n instanceof Map && n.forEach((t, s) => e.set(s, t)), e instanceof Set && n instanceof Set && n.forEach(e.add, e);
  for (const t in n) {
    if (!n.hasOwnProperty(t))
      continue;
    const s = n[t], o = e[t];
    L(o) && L(s) && e.hasOwnProperty(t) && !U(s) && !te(s) ? e[t] = _e(o, s) : e[t] = s;
  }
  return e;
}
const Lt = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Ct(e) {
  return !L(e) || !e.hasOwnProperty(Lt);
}
const { assign: S } = Object;
function Ae(e) {
  return !!(U(e) && e.effect);
}
function Te(e, n, t, s) {
  const { state: o, actions: a, getters: r } = n, i = t.state.value[e];
  let c;
  function f() {
    !i && (process.env.NODE_ENV === "production" || !s) && (t.state.value[e] = o ? o() : {});
    const p = process.env.NODE_ENV !== "production" && s ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Se(j(o ? o() : {}).value)
    ) : Se(t.state.value[e]);
    return S(p, a, Object.keys(r || {}).reduce((_, y) => (process.env.NODE_ENV !== "production" && y in p && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${y}" in store "${e}".`), _[y] = P(me(() => {
      W(t);
      const w = t._s.get(e);
      return r[y].call(w, w);
    })), _), {}));
  }
  return c = ge(e, f, n, t, s, !0), c;
}
function ge(e, n, t = {}, s, o, a) {
  let r;
  const i = S({ actions: {} }, t);
  if (process.env.NODE_ENV !== "production" && !s._e.active)
    throw new Error("Pinia destroyed");
  const c = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Ce && (c.onTrigger = (u) => {
    f ? w = u : f == !1 && !d._hotUpdating && (Array.isArray(w) ? w.push(u) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let f, p, _ = P([]), y = P([]), w;
  const $ = s.state.value[e];
  !a && !$ && (process.env.NODE_ENV === "production" || !o) && (s.state.value[e] = {});
  const oe = j({});
  let ye;
  function ve(u) {
    let l;
    f = p = !1, process.env.NODE_ENV !== "production" && (w = []), typeof u == "function" ? (u(s.state.value[e]), l = {
      type: N.patchFunction,
      storeId: e,
      events: w
    }) : (_e(s.state.value[e], u), l = {
      type: N.patchObject,
      payload: u,
      storeId: e,
      events: w
    });
    const g = ye = Symbol();
    Ee().then(() => {
      ye === g && (f = !0);
    }), p = !0, M(_, l, s.state.value[e]);
  }
  const Ze = a ? function() {
    const { state: l } = t, g = l ? l() : {};
    this.$patch((b) => {
      S(b, g);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : ze
  );
  function Ke() {
    r.stop(), _ = [], y = [], s._s.delete(e);
  }
  function we(u, l) {
    return function() {
      W(s);
      const g = Array.from(arguments), b = [], R = [];
      function et(E) {
        b.push(E);
      }
      function tt(E) {
        R.push(E);
      }
      M(y, {
        args: g,
        name: u,
        store: d,
        after: et,
        onError: tt
      });
      let F;
      try {
        F = l.apply(this && this.$id === e ? this : d, g);
      } catch (E) {
        throw M(R, E), E;
      }
      return F instanceof Promise ? F.then((E) => (M(b, E), E)).catch((E) => (M(R, E), Promise.reject(E))) : (M(b, F), F);
    };
  }
  const z = /* @__PURE__ */ P({
    actions: {},
    getters: {},
    state: [],
    hotState: oe
  }), be = {
    _p: s,
    // _s: scope,
    $id: e,
    $onAction: $e.bind(null, y),
    $patch: ve,
    $reset: Ze,
    $subscribe(u, l = {}) {
      const g = $e(_, u, l.detached, () => b()), b = r.run(() => ke(() => s.state.value[e], (R) => {
        (l.flush === "sync" ? p : f) && u({
          storeId: e,
          type: N.direct,
          events: w
        }, R);
      }, S({}, c, l)));
      return g;
    },
    $dispose: Ke
  }, d = ot(process.env.NODE_ENV !== "production" || J ? S(
    {
      _hmrPayload: z,
      _customProperties: P(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    be
    // must be added later
    // setupStore
  ) : be);
  s._s.set(e, d);
  const A = s._e.run(() => (r = De(), r.run(() => n())));
  for (const u in A) {
    const l = A[u];
    if (U(l) && !Ae(l) || te(l))
      process.env.NODE_ENV !== "production" && o ? Y(oe.value, u, q(A, u)) : a || ($ && Ct(l) && (U(l) ? l.value = $[u] : _e(l, $[u])), s.state.value[e][u] = l), process.env.NODE_ENV !== "production" && z.state.push(u);
    else if (typeof l == "function") {
      const g = process.env.NODE_ENV !== "production" && o ? l : we(u, l);
      A[u] = g, process.env.NODE_ENV !== "production" && (z.actions[u] = l), i.actions[u] = l;
    } else
      process.env.NODE_ENV !== "production" && Ae(l) && (z.getters[u] = a ? (
        // @ts-expect-error
        t.getters[u]
      ) : l, ne && (A._getters || // @ts-expect-error: same
      (A._getters = P([]))).push(u));
  }
  if (S(d, A), S(Q(d), A), Object.defineProperty(d, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? oe.value : s.state.value[e],
    set: (u) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      ve((l) => {
        S(l, u);
      });
    }
  }), process.env.NODE_ENV !== "production" && (d._hotUpdate = P((u) => {
    d._hotUpdating = !0, u._hmrPayload.state.forEach((l) => {
      if (l in d.$state) {
        const g = u.$state[l], b = d.$state[l];
        typeof g == "object" && L(g) && L(b) ? Qe(g, b) : u.$state[l] = b;
      }
      Y(d, l, q(u.$state, l));
    }), Object.keys(d.$state).forEach((l) => {
      l in u.$state || le(d, l);
    }), f = !1, p = !1, s.state.value[e] = q(u._hmrPayload, "hotState"), p = !0, Ee().then(() => {
      f = !0;
    });
    for (const l in u._hmrPayload.actions) {
      const g = u[l];
      Y(d, l, we(l, g));
    }
    for (const l in u._hmrPayload.getters) {
      const g = u._hmrPayload.getters[l], b = a ? (
        // special handling of options api
        me(() => (W(s), g.call(d, d)))
      ) : g;
      Y(d, l, b);
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
      Object.defineProperty(d, l, S({ value: d[l] }, u));
    });
  }
  return s._p.forEach((u) => {
    if (J) {
      const l = r.run(() => u({
        store: d,
        app: s._a,
        pinia: s,
        options: i
      }));
      Object.keys(l || {}).forEach((g) => d._customProperties.add(g)), S(d, l);
    } else
      S(d, r.run(() => u({
        store: d,
        app: s._a,
        pinia: s,
        options: i
      })));
  }), process.env.NODE_ENV !== "production" && d.$state && typeof d.$state == "object" && typeof d.$state.constructor == "function" && !d.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${d.$id}".`), $ && a && t.hydrate && t.hydrate(d.$state, $), f = !0, p = !0, d;
}
function Mt(e, n, t) {
  let s, o;
  const a = typeof n == "function";
  typeof e == "string" ? (s = e, o = a ? t : n) : (o = e, s = e.id);
  function r(i, c) {
    const f = st();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && G && G._testing ? null : i) || f && nt(Ue, null), i && W(i), process.env.NODE_ENV !== "production" && !G)
      throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
    i = G, i._s.has(s) || (a ? ge(s, n, o, i) : Te(s, o, i), process.env.NODE_ENV !== "production" && (r._pinia = i));
    const p = i._s.get(s);
    if (process.env.NODE_ENV !== "production" && c) {
      const _ = "__hot:" + s, y = a ? ge(_, n, o, i, !0) : Te(_, S({}, o), i, !0);
      c._hotUpdate(y), delete i.state.value[_], i._s.delete(_);
    }
    if (process.env.NODE_ENV !== "production" && ne && f && f.proxy && // avoid adding stores that are just built for hot module replacement
    !c) {
      const _ = f.proxy, y = "_pStores" in _ ? _._pStores : _._pStores = {};
      y[s] = p;
    }
    return p;
  }
  return r.$id = s, r;
}
function xt(e) {
  {
    e = Q(e);
    const n = {};
    for (const t in e) {
      const s = e[t];
      (U(s) || te(s)) && (n[t] = // ---
      q(e, t));
    }
    return n;
  }
}
const Ye = Mt("messages", () => {
  const e = j([]), n = j(!1), t = j(null), s = j("top-right");
  function o(c) {
    e.value.push(c), c.duration && setTimeout(() => a(c), c.duration);
  }
  function a(c) {
    e.value = e.value.filter((f) => f.id !== c.id);
  }
  function r(c) {
    c && (t.value = c, t.value.type = "wait"), n.value = !0;
  }
  function i() {
    t.value = null, n.value = !1;
  }
  return {
    messages: e,
    wait: t,
    position: s,
    isWait: n,
    removeMessage: a,
    newMessage: o,
    waitAction: r,
    unwaitAction: i
  };
});
function ue(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const Ut = ["data-message-type"], Rt = { class: "message__img" }, Ft = ["src"], Ht = se({
  name: "AppToast"
}), Gt = /* @__PURE__ */ se({
  ...Ht,
  props: {
    message: null
  },
  emits: ["remove"],
  setup(e, { emit: n }) {
    const t = e, s = je();
    function o(a) {
      a && a.type !== "wait" && n("remove", a);
    }
    return (a, r) => (T(), H("li", {
      class: V([
        m(s).message__item,
        m(s)[`message__item--${t.message.type}`],
        m(ue)(t.message.class || "")
      ]),
      "data-message-type": t.message.type
    }, [
      re("div", Rt, [
        B(a.$slots, `message__img-${t.message.type}`, {
          item: t.message
        }, () => [
          t.message.img ? (T(), H("img", {
            key: 1,
            src: typeof t.message.img == "object" ? t.message.img.value : t.message.img,
            class: V([
              m(s)["message__img-custom"],
              typeof t.message.img == "object" ? m(ue)(t.message.img.class) : ""
            ]),
            alt: "message avatar"
          }, null, 10, Ft)) : (T(), H("div", {
            key: 0,
            class: V(t.message.type === "wait" ? m(s)["message__img-wait"] : t.message.type === "success" ? m(s)["message__img-success"] : t.message.type === "error" ? m(s)["message__img-error"] : t.message.type === "warning" ? m(s)["message__img-warning"] : m(s)["message__img-custom"])
          }, Oe(t.message.type === "success" ? "✓" : t.message.type === "warning" ? "!" : ""), 3))
        ])
      ]),
      re("div", {
        class: V(m(s).message__title)
      }, [
        B(a.$slots, `message__title-${t.message.type}`, {
          item: { ...t.message }
        }, () => [
          re("p", {
            class: V([
              m(s)["message__title-content"],
              typeof t.message.title == "object" ? m(ue)(t.message.title.class) : ""
            ])
          }, Oe(typeof t.message.title == "object" ? t.message.title.value : t.message.title), 3)
        ])
      ], 2),
      t.message.type !== "wait" ? (T(), H("button", {
        key: 0,
        type: "button",
        class: V(m(s).message__close),
        onClick: r[0] || (r[0] = (i) => o(t.message))
      }, [
        B(a.$slots, "message__delete-btn", {}, () => [
          at(" × ")
        ])
      ], 2)) : Le("", !0)
    ], 10, Ut));
  }
}), Bt = "_message__item_1mhlw_1", Jt = "_message__title_1mhlw_25", Wt = "_message__img_1mhlw_28", Qt = "_message__close_1mhlw_100", zt = {
  message__item: Bt,
  "message__item--error": "_message__item--error_1mhlw_12",
  "message__item--wait": "_message__item--wait_1mhlw_15",
  "message__item--success": "_message__item--success_1mhlw_19",
  "message__item--warning": "_message__item--warning_1mhlw_22",
  "message__item--custom": "_message__item--custom_1mhlw_25",
  message__title: Jt,
  message__img: Wt,
  "message__img-error": "_message__img-error_1mhlw_34",
  "message__img-wait": "_message__img-wait_1mhlw_58",
  "lds-hourglass": "_lds-hourglass_1mhlw_1",
  "message__img-success": "_message__img-success_1mhlw_78",
  "message__img-custom": "_message__img-custom_1mhlw_83",
  "message__img-warning": "_message__img-warning_1mhlw_87",
  message__close: Qt
}, qe = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [s, o] of n)
    t[s] = o;
  return t;
}, Yt = {
  $style: zt
}, Ve = /* @__PURE__ */ qe(Gt, [["__cssModules", Yt]]), qt = {
  title: "Wait please ..",
  type: "wait"
}, Xt = se({
  name: "MessagesHandleComponent"
}), Zt = /* @__PURE__ */ se({
  ...Xt,
  setup(e) {
    const n = je(), t = Ye(), { messages: s, wait: o, position: a, isWait: r } = xt(t), i = me(() => o.value ? o.value : qt);
    function c(f) {
      t.removeMessage(f);
    }
    return (f, p) => (T(), ie(ct, {
      name: "list",
      tag: "ul",
      class: V([m(n).message__list, `message__list--${m(a)}`])
    }, {
      default: ae(() => [
        m(r) ? (T(), ie(Ve, {
          key: 0,
          message: m(i)
        }, Ne({ _: 2 }, [
          ce(f.$slots, (_, y) => ({
            name: y,
            fn: ae(() => [
              B(f.$slots, y)
            ])
          }))
        ]), 1032, ["message"])) : Le("", !0),
        (T(!0), H(lt, null, ce(m(s), (_) => (T(), ie(Ve, {
          key: _.id,
          message: _,
          onRemove: c
        }, Ne({ _: 2 }, [
          ce(f.$slots, (y, w) => ({
            name: w,
            fn: ae(($) => [
              B(f.$slots, w, {
                item: { ...$ }
              })
            ])
          }))
        ]), 1032, ["message"]))), 128))
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), Kt = "_message__list_poj2d_1", es = {
  message__list: Kt
};
const ts = {
  $style: es
}, Xe = /* @__PURE__ */ qe(Zt, [["__cssModules", ts]]);
function ss(e) {
  return { ...e, id: Date.now().toString() };
}
const ns = {
  install: (e, n) => {
    const t = Ye();
    n != null && n.position && (t.position = n.position);
    function s(c) {
      const f = ss(c);
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
      addNewMessage: s,
      removeMessage: o,
      waitAction: a,
      stopAction: r
    };
    e.provide("message", i), e.component("VMessage", Xe), e.config.globalProperties.$message = i;
  }
}, rs = {
  install: (e, n) => {
    e.component("AppMessages", Xe);
    const t = jt();
    e.use(t), e.use(ns, n);
  }
};
export {
  rs as default
};
