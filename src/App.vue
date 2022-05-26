<template>
	<div>
		<div class="container">
			<div class="editor">
				<CodeEditor
					class=" atom_one_light code_editor_custom"
					:languages="[['HTML', 'HTML']]"
					v-model="content"
					:wrap_code="true"
					v-bind="getTextareaAttrs"
				></CodeEditor>
			</div>

			<div class="editor">
				<CodeEditor
				class=" atom_one_light code_editor_custom"
					:languages="[['HTML', 'HTML']]"
					v-model="result"
					:wrap_code="true"
					v-bind="getTextareaAttrs"
				></CodeEditor>
			</div>
		</div>
		<div class="container">
			<div class="settings">

				<button
					class="button"
					@click="addAttrs"
				>Проставить атрибуты</button>
				<!-- <button class="button">Конвертировать</button> -->

			</div>

			<div class="result-object">
				<div class="result-object__header">
					<h3>Элементы</h3>
					<div
						@click="copyElementsObject"
						class="copy_code"
						tabindex="0"
						data-v-3b801528=""
						data-v-76b5d460=""
						style="width: 16px; height: 16px;"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="100%"
							height="100%"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#aaa"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-copy"
							data-v-3b801528=""
						>
							<rect
								x="9"
								y="9"
								width="13"
								height="13"
								rx="2"
								ry="2"
								data-v-3b801528=""
							></rect>
							<path
								d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
								data-v-3b801528=""
							></path>
						</svg>
					</div>
				</div>
				<div
					ref="elemntsResult"
					class="result-object__result"
				>
					{{elements}}
				</div>
			</div>
		</div>

		<div
			ref="hiddenHTML"
			class="hiddenHTML"
		></div>
		<div
			ref="hiddenHTML_result"
			class="hiddenHTML"
		></div>
	</div>
</template>

<script>
import "./assets/style.scss";
// https://simple-code-editor.vicuxd.com/
import CodeEditor from "simple-code-editor";
// import DropdownSelect from "./components/Dropdown";
// import { addAttrs } from "./assets/convertFunctions";

export default {
	name: "ForuGenerator",

	components: {
		CodeEditor,
		// DropdownSelect,
	},

	data() {
		return {
			blockTypes: ["Табы", "Обложка", "Цены", "Подвал"],
			selectedBlockType: "Табы",
			content: `<div onclick="alert(1)" class="trade__form-input" tabindex="0">
    Текстовый узел
    <div></div>
    <input placeholder="Placeholder" style="display: block; opacity: 0.9" elementid="elmqbeaq2562osaqdsokq9wr" type="number" value="45271.59">
    <label>Цена</label>
    <div class="trade__form-input-tooltip">
        Введите объем <b>покупки</b>
    </div>
    <a id="link" href="vk.com">Ссылка</a>
    <img alt="someimg" />
    <iframe width="100%" title="Wikipedia page for Avocados" src="https://en.wikipedia.org/wiki/Avocado"></iframe>

    <textarea required name="" id="" cols="30" rows="10"></textarea>
    <textarea required="" name="" id="" cols="30" rows="10"></textarea>
    <textarea required="required" name="" id="" cols="30" rows="10"></textarea>
	<textarea name="" id="" cols="30" rows="10"></textarea>
</div>`,
			result: "",
			elements: "",
		};
	},

	computed: {
		getTextareaAttrs() {
			return {
				width: "100%",
				height: "400px",
				border_radius: "8px",
			};
		},
	},

	methods: {
		copyElementsObject() {
			// this.$refs.elemntsResult.focus();
			// document.execCommand("copy");

			var range = document.createRange();
			range.selectNode(this.$refs.elemntsResult);
			window.getSelection().removeAllRanges(); // clear current selection
			window.getSelection().addRange(range); // to select text
			document.execCommand("copy");
			window.getSelection().removeAllRanges(); // to deselect
		},
		selectType(type) {
			this.selectedBlockType = type;
		},

		generateId() {
			function generateRandomString(len, charSet) {
				charSet = charSet || "abcdefghijklmnopqrstuvwxyz0123456789";
				var randomString = "";
				var i = 0;
				while (i < len) {
					let randomPoz = Math.floor(Math.random() * charSet.length);
					randomString += charSet.substring(randomPoz, randomPoz + 1);
					i++;
				}
				return randomString;
			}
			return "el" + generateRandomString(32, null).toLowerCase();
		},

		addClasses(node, id, element) {
			let classes = Array.from(node.classList).join(" ");

			if (classes == "") {
				classes = "";
			}
			element["classes"] = classes;
			node.setAttribute("ng-class", `sitecontent['${id}']['classes']`);
		},

		addStyle(node, id, element) {
			let style = node.getAttribute("style");
			let properties = {};

			if (style !== null && style !== "") {
				const styleRegex = /([\w-]*)\s*:\s*([^;]*)/g;

				for (let i = 0; i < style.split(";").length; i++) {
					const match = styleRegex.exec(style);
					properties[match[1]] = match[2].trim();
				}
			}
			element["style"] = properties;
			node.setAttribute("ng-style", `sitecontent['${id}']['style']`);
			node.removeAttribute("style");
		},

		addModelId(node, id, element) {
			let nodeId = node.getAttribute("id");

			if (nodeId != null) {
				element["modelid"] = nodeId;
			}

			node.setAttribute(
				"ng-attr-modelid",
				`{{sitecontent['${id}']['modelid']}}`
			);
			node.removeAttribute("id");
		},

		addModel(node, id, element) {
			if (node.children.length == 0 && node.childNodes.length > 0) {
				node.setAttribute("ng-model", `sitecontent['${id}']['text']`);
				node.setAttribute("ui-tinymce", "tinymceOptions");

				let textContent = node.textContent;
				textContent = textContent
					.replace(/\n/g, "")
					.replace(/\s+/g, " ");
				element["text"] = textContent;
				node.innerHTML = "";
			}
		},

		addAttrs() {
			this.$refs.hiddenHTML.innerHTML = this.content;

			const hiddenHTML = this.$refs.hiddenHTML;
			const nodes = hiddenHTML.querySelectorAll("*");
			const elements = {};

			let generatedTextWrappers = [];

			nodes.forEach((node) => {
				let id = null;
				let childNodes = node.childNodes;
				// const textTags = /\bDIV\b|\bP\b|\bSPAN\b|\bH1\b|\bH2\b|\bH3\b|\bH4\b|\bH5\b|\bH6\b|\bB\b|\bSTRONG\b|\bBLOQUOTE\b|\bI\b|\bLABEL\b|\bQ\b|\bS\b/

				//если айди есть, ставим его, иначе генерируем
				if (!node.hasAttribute("elementid")) {
					id = this.generateId();
					node.setAttribute("elementid", id);
				} else {
					id = node.getAttribute("elementid");
				}
				elements[id] = {};
				const element = elements[id];

				//задаем классы
				this.addClasses(node, id, element);

				//задаем стили
				this.addStyle(node, id, element);

				//задаем айди узла
				this.addModelId(node, id, element);

				//текстовый узел
				this.addModel(node, id, element);

				//оборачиваем в div текстовые узлы
				for (let i = 0; i < childNodes.length; i++) {
					if (childNodes[i].nodeType == 3) {
						if (
							childNodes[i].textContent.trim() != "" &&
							node == childNodes[i].parentNode &&
							node.children.length > 0
						) {
							const div = document.createElement("div");
							childNodes[i].data.trim();
							childNodes[i].after(div);

							div.appendChild(childNodes[i]);
							generatedTextWrappers.push(div);
						}
					}
				}

				if (node.tagName === "A") {
					const href = node.getAttribute("href");
					let target = node.getAttribute("target");

					if (!href) {
						alert("У ссылки (тега а) отсутствует атрибут href");
					} else {
						node.setAttribute(
							"ng-href",
							`{{sitecontent['${id}']['href']}}`
						);
						element["href"] = href;
						node.removeAttribute("href");
					}

					if (!target) {
						target = "_self";
					}
					node.setAttribute(
						"ng-attr-target",
						`{{sitecontent['${id}']['target']}}`
					);
					element["target"] = target;
					node.removeAttribute("target");
				}

				if (node.tagName === "IMG") {
					const src = node.getAttribute("src");
					const alt = node.getAttribute("alt");

					if (!src) {
						alert(
							"У изображения (тега img) отсутствует атрибут src"
						);
					} else {
						node.setAttribute(
							"ng-src",
							`{{sitecontent['${id}']['src']}}`
						);
						element["src"] = src;
						node.removeAttribute("src");
					}

					if (alt) {
						node.setAttribute(
							"attr-alt",
							`{{sitecontent['${id}']['alt']}}`
						);
						element["alt"] = alt;
						node.removeAttribute("alt");
					}
				}

				if (node.tagName === "IFRAME") {
					const src = node.getAttribute("src");
					const width = node.getAttribute("width");
					const height = node.getAttribute("height");

					if (!src) {
						alert("У iframe отсутствует атрибут src");
					} else {
						node.setAttribute(
							"ng-src",
							`{{sitecontent['${id}']['src']}}`
						);
						element["src"] = src;
						node.removeAttribute("src");
					}

					if (width) {
						node.setAttribute(
							"ng-attr-width",
							`{{sitecontent['${id}']['width']}}`
						);
						element["width"] = width;
						node.removeAttribute("width");
					}

					if (height) {
						node.setAttribute(
							"ng-attr-height",
							`{{sitecontent['${id}']['height']}}`
						);
						element["height"] = height;
						node.removeAttribute("height");
					}
				}

				if (node.tagName === "TEXTAREA" || node.tagName === "INPUT") {
					const placeholder = node.getAttribute("placeholder");
					const required = node.getAttribute("required");
					element["required"] = false;

					node.setAttribute(
						"ng-required",
						`{{sitecontent['${id}']['required']}}`
					);

					if (required || required == "") {
						element["required"] = true;
						node.removeAttribute("required");
					}

					if (placeholder) {
						node.setAttribute(
							"ng-attr-placeholder",
							`{{sitecontent['${id}']['placeholder']}}`
						);
						element["placeholder"] = placeholder;
						node.removeAttribute("placeholder");
					}
				}

				console.log(node.tagName, element);
				// elements.push(element)
			});

			//так как дивы, которым оборачиваем текстовые узлы, не присутствуют в nodes, нужно их проходить отдельно

			generatedTextWrappers.forEach((div) => {
				let id = this.generateId();
				elements[id] = {};
				const element = elements[id];

				this.addClasses(div, id, element);

				this.addStyle(div, id, element);

				this.addModel(div, id, element);

				console.log(div.tagName, element);
				// elements.push(element)
			});

			console.log(elements);

			this.elements = elements;

			this.$refs.hiddenHTML_result.innerHTML = hiddenHTML.innerHTML;

			this.result = this.$refs.hiddenHTML_result.innerHTML;
		},
	},
};
</script>
