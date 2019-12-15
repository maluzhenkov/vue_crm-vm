<template>
  <div>
    <div class="page-title">
      <h3>{{ "Kanban" | localize }}</h3>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <div class="kanban">
        <div class="columns">
          <div class="column" v-for="(c, idx) in columns" :key="c.id">
            <div class="caption">{{c.title}}</div>
            <div class="items-list">
              <div class="item" v-for="i in c.cards" :key="i.id">{{i.text}}</div>
              <textarea
                class="item"
                v-if="c.addcard"
                ref="textarea"
                @blur="blur(idx)"
                @enter="blur(idx)"
                placeholder="Введите текст карточки"
                v-model.trim="textarea"
              ></textarea>
            </div>
            <div
              class="add-item waves-effect waves-teal btn-flat"
              @click="addCard(idx)"
              @keyup.enter.ctrl.exact="addCard(idx)"
            >
              <i class="material-icons left">add</i>
              Добавить карточку
            </div>
          </div>
        </div>

        <div class="btn">
          <i class="material-icons left">add</i>
          Добавить колонку
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    textarea: "",
    columns: [
      {
        id: 1,
        title: "Title 1",
        cards: [
          { id: 1, text: "Задача 1" },
          { id: 2, text: "Задача 2" },
          { id: 3, text: "Задача 3" },
          { id: 4, text: "Задача 4" }
        ],
        addcard: false
      },
      {
        id: 2,
        title: "Title 2",
        cards: [
          { id: 5, text: "Задача 1" },
          { id: 6, text: "Задача 2" },
          { id: 7, text: "Задача 3" },
          { id: 8, text: "Задача 4" }
        ],
        addcard: false
      }
    ]
  }),
  methods: {
    addCard(idx) {
      this.columns[idx].addcard = !this.columns[idx].addcard;
      setTimeout(() => {
        this.$refs.textarea[0].focus();
      }, 0);
    },
    blur(idx) {
      if (this.textarea === "") {
        this.columns[idx].addcard = !this.columns[idx].addcard;
      } else {
        this.columns[idx].cards.push({
          id: this.columns[idx].cards.length + 1,
          text: this.textarea
        });
        this.columns[idx].addcard = !this.columns[idx].addcard;
      }
      this.textarea = "";
    }
  }
};
</script>
