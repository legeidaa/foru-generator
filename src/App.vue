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
					@click="addAttributess"
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
import { addAttrs } from "./assets/convertFunctions";

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
		selectType(type) {
			this.selectedBlockType = type;
		},

		addAttributess() {
			this.$refs.hiddenHTML.innerHTML = this.content;
			this.result = addAttrs();
		},
	},
};
</script>
