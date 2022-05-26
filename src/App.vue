<template>
	<div>
		<div class="container">
			<CodeEditor
				class=" atom_one_dark code_editor_custom"
				:languages="[['HTML', 'HTML']]"
				v-model="content"
				:wrap_code="true"
				v-bind="getTextareaAttrs"
			></CodeEditor>

			<CodeEditor
				:languages="[['HTML', 'HTML']]"
				v-model="result"
				:wrap_code="true"
				v-bind="getTextareaAttrs"
			></CodeEditor>
		</div>
		<div class="container">
			<div class="settings">
				<button
					class="button"
					@click="addAttrs"
				>Проставить атрибуты</button>
				<!-- <button class="button">Конвертировать</button> -->
				<DropdownSelect
					:blockTypes="blockTypes"
					:selectedBlockType="selectedBlockType"
					@selectType="selectType"
				>
					{{ selectedBlockType }}
				</DropdownSelect>

			</div>

			<div class="result-object">
				<div class="result-object__header">

				</div>
				<div class="result-object-content">
					{{elements}}
				</div>
			</div>
		</div>

		<div
			ref="hiddenHTML"
			class="hiddenHTML"
		></div>

	</div>
</template>

<script>
import "./assets/style.scss";
// https://simple-code-editor.vicuxd.com/
import CodeEditor from "simple-code-editor";
import DropdownSelect from "./components/Dropdown";
// import { addAttrs } from "./assets/convertFunctions";

export default {
	name: "ForuGenerator",

	components: {
		CodeEditor,
		DropdownSelect,
	},

	data() {
		return {
			blockTypes: ["Табы", "Обложка", "Цены", "Подвал"],
			selectedBlockType: "Табы",
			content: `<div onclick="alert(1)" class="trade__form-input" tabindex="0">
        Текстовый узел
        <div></div>
        <input style="display: block; opacity: 0.9" elementid="elmqbeaq2562osaqdsokq9wr" type="number" value="45271.59">
        <label>Цена</label>
        <div class="trade__form-input-tooltip">
            Введите объем <b>покупки</b>
        </div>
        <a id="link" href="vk.com">Ссылка</a>
        <img />
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

	mounted() {
		this.$refs.hiddenHTML.innerHTML = this.content;
	},

	methods: {
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
			return "el" + generateRandomString(5, null).toLowerCase();
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
			// node.removeAttribute('style')
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
		},

		addModel(node, id, element) {
			if (node.children.length == 0 && node.childNodes.length > 0) {
				node.setAttribute("ng-model", `sitecontent['${id}']['text']`);

				let textContent = node.textContent;
				textContent = textContent
					.replace(/\n/g, "")
					.replace(/\s+/g, " ");
				element["text"] = textContent;
				node.innerHTML = "";
			}
		},

		addAttrs() {
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
			// return hiddenHTML.innerHTML;
			this.elements = elements;

			this.result = hiddenHTML.innerHTML;
		},
	},
};
</script>
