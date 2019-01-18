<template>
  <div class="composer">
    <div class="composer_container">
      <div class="typer_container">
        <v-textarea
          ref="newMsg"
          v-model="newMsg"
          box
          auto-grow
          flat
          hide-details
          autofocus
          class="message-field"
          solo
          :placeholder="$t('Type a message here')"
          @keyup.enter.native="postMessageOnEnter"
          rows="1"
        >
          <emoji-picker :search="searchEmoji" slot="prepend" @emoji="appendEmoji">
            <div class="emoji-invoker" slot="emoji-invoker" slot-scope="{ events }" v-on="events">
              <v-icon>ti-face-smile</v-icon>
            </div>
            <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
              <div :style="{ top: -19.5 + 'rem' }" class="emoji-picker">
                <div class="emoji-picker__search">
                  <input type="text" v-focus v-model="searchEmoji">
                </div>
                <div style="padding-top: 10px;">
                  <div :key="category" v-for="(emojiGroup, category) in emojis">
                    <h5>{{ category }}</h5>
                    <div class="emojis">
                              <span :key="emojiName" :title="emojiName" @click="insert(emoji)"
                                    v-for="(emoji, emojiName) in emojiGroup">{{ emoji }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </emoji-picker>
          <v-icon @click="pickFile" slot="append" class="">attach_file</v-icon>
          <v-icon @click="postMessage" slot="append-outer" style="color: #2939d7;cursor: pointer;font-size: 30px;" v-if="isFormValid">send</v-icon>
          <v-icon slot="append-outer" style="cursor: pointer;font-size: 30px;" v-else>send</v-icon>
        </v-textarea>
        <file-base64 :done="getFiles" :multiple="false" ref="attachment" style="display: none"></file-base64>
      </div>
      <div class="composer_attachments_list">
        <div class="attachments">
          <div :key="uattachment.name" class="composer_attachment" v-for="uattachment in uploadingAttachments">
            <div class="image_box">
              <img class="responsive" height="64" v-bind:src="'data:image/jpeg;base64,' + uattachment.datas" v-if="isImage(uattachment.filetype)" width="64"/>
              <img class="responsive" height="64" src="../../assets/img/text.png" v-else width="64"/>
            </div>
            <div class="caption">{{ uattachment.name }}</div>
            <div class="progress_bar">Uploading...</div>
          </div>
        </div>
        <div class="attachments">
          <div :key="attachment.name" class="composer_attachment" v-for="attachment in uploadedAttachments">
            <div class="image_box">
              <img class="responsive" height="64" v-bind:src="'data:image/jpeg;base64,' + attachment.datas" v-if="isImage(attachment.filetype)" width="64"/>
              <img class="responsive" height="64" src="../../assets/img/text.png" v-else width="64"/>
            </div>
            <div class="caption">{{ attachment.name }}</div>
            <div class="attachment_delete">
              <a @click.prevent="deleteAttachment(attachment)">
                <v-icon>clear</v-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import FileBase64 from "../../components/FileBase64";
  import { convertLocalDateTimeToUTCTime } from "../../utils/dateUtils"
export default {
  name: 'ReplyForm',
  props: [
    'channel',
    'imageMimeTypes'
  ],
  components: {
    FileBase64
  },
  data() {
    return {
      newMsg: "",
      searchEmoji: "",
    }
  },
  methods: {
    postMessageOnEnter(event) {
      if(event.keyCode == 13 && event.shiftKey) {
        return false;
      }
      this.sendMessage();
    },
    postMessage(event) {
      this.sendMessage();
    },
    sendMessage() {
      if(this.newMsg.trim() != '' || this.$store.state.communication.attachments.length > 0) {
        let data = window.sessionStorage.getItem("parents-app");
        let jsonObject = JSON.parse(data);
        const msg = Object.assign({}, this.msg);
        msg.channelId = this.channel.id;
        msg.create_date = convertLocalDateTimeToUTCTime(new Date().toUTCString());
        msg.subject = null;
        msg.create_uid = jsonObject.user.user.id;
        msg.display_name = this.channel.name;
        msg.attachment_ids = this.$store.state.communication.attachments.map(
          attachment => Number(attachment.id)
        );
        msg.subtype_id = 1;
        msg.body = this.newMsg;
        msg.model = "mail.channel";
        msg.record_name = this.channel.name;
        msg.message_type = "comment";
        msg.author_id = [];
        msg.author_id.push(jsonObject.user.user.partner_id.id);
        msg.author_id.push(jsonObject.user.user.partner_id.name);
        msg.content_subtype = "html";
        msg.partner_ids = [];
        this.$store.dispatch("communication/postMessage", msg);
        this.$store.dispatch("communication/appendSentMessage", msg);
        this.newMsg = "";
        this.$refs.newMsg.focus();
      }
    },
    getFiles(files) {
      console.log(files)
      let data = {
        name: files.name,
        type: "binary",
        datas: files.base64,
        datas_fname: files.name,
        res_model: "mail.channel",
        res_id: Number(this.channel.id),
        filetype: files.type
      };
      this.$store.commit("communication/pushUploadingAttachments", data);
      this.$store.dispatch("communication/uploadAttachment", data);
    },
    pickFile() {
      this.$refs.attachment.$el.click();
    },
    appendEmoji(emoji) {
      this.newMsg += emoji;
    },
    isImage(filetype) {
      return this.imageMimeTypes.includes(filetype);
    },
    deleteAttachment(attachment) {
      this.$store.dispatch("communication/deleteAttachment", attachment);
    },
  },
  computed: {
    uploadedAttachments() {
      return this.$store.state.communication.attachments;
    },
    uploadingAttachments() {
      return this.$store.state.communication.uploadingAttachments;
    },
    isFormValid() {
      return (this.newMsg != '') || (this.uploadedAttachments.length > 0);
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  }
}
</script>
<style scoped>
  .composer {
    position: relative;
    -ms-flex: 0 0 auto;
    -moz-flex: 0 0 auto;
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
    flex: 0 0 auto;
    display: -ms-flexbox;
    display: -moz-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    margin: 0;
    border-top: none;
    background: #fff;
  }
  .composer_container {
    position: relative;
    -ms-flex: 1 1 auto;
    -moz-flex: 1 1 auto;
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
  }
  .v-textarea.message-field >>> textarea {
    max-height: 300px;
    overflow: auto;
    margin-top: 0px;
  }
  >>>.v-speed-dial--bottom:not(.v-speed-dial--absolute) {
    bottom: 18px;
    left: 22px;
  }
  >>>.theme--light.v-text-field--box .v-input__slot{
    background: transparent;
  }
  >>>.v-input__append-outer {
    margin-right: 5px;
    margin-top: 12px !important;
  }
  >>>.v-text-field.v-text-field--solo .v-input__prepend-outer, >>>.v-text-field.v-text-field--solo .v-input__append-outer {
    margin-top: 4px;
    margin-right: 4px;
  }

  .emoji-invoker {
    top: 1rem;
    left: 4rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
    padding: 12px;
  }

  .emoji-invoker:hover {
    transform: scale(1.1);
  }

  .emoji-invoker > svg {
    fill: #b1c6d0;
  }

  .emoji-picker {
    position: absolute;
    z-index: 1;
    font-family: Montserrat;
    border: 1px solid #ccc;
    width: 15rem;
    height: 20rem;
    overflow: scroll;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    background: #fff;
    box-shadow: 1px 1px 8px #c7dbe6;
  }

  .emoji-picker__search {
    display: flex;
  }

  .emoji-picker__search > input {
    flex: 1;
    border-radius: 10rem;
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    outline: none;
  }

  .emoji-picker h5 {
    margin-bottom: 0;
    color: #b1b1b1;
    text-transform: uppercase;
    font-size: 0.8rem;
    cursor: default;
  }

  .emoji-picker .emojis {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .emoji-picker .emojis:after {
    content: "";
    flex: auto;
  }

  .emoji-picker .emojis span {
    padding: 0.2rem;
    cursor: pointer;
    border-radius: 5px;
  }

  .emoji-picker .emojis span:hover {
    background: #ececec;
    cursor: pointer;
  }

  .composer_attachments_list {
    -ms-flex: 1 0 100%;
    -moz-flex: 1 0 100%;
    -webkit-box-flex: 1;
    -webkit-flex: 1 0 100%;
    flex: 1 0 100%;
  }

  .composer_attachments_list .attachments:not(:empty) {
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: justify;
  }

  .composer_attachments_list .composer_attachment {
    position: relative;
    vertical-align: top;
    display: inline-block;
    text-align: center;
    width: 100px;
    margin: 5px;
  }

  .composer_attachments_list .composer_attachment .image_box {
    position: relative;
  }

  .composer_attachments_list .composer_attachment .caption {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 5px;
  }

  .composer_attachments_list .composer_attachment .attachment_delete {
    position: absolute;
    top: -10px;
    left: auto;
    bottom: auto;
    right: -8px;
    color: #4c4c4c;
    cursor: pointer;
    -webkit-transition: opacity 0.2s linear 0s;
    -moz-transition: opacity 0.2s linear 0s;
    -o-transition: opacity 0.2s linear 0s;
    transition: opacity 0.2s linear 0s;
  }
  >>>.v-text-field.v-text-field--solo .v-input__control {
    margin-left: 10px;
  }
</style>
