import UploadCSV from "./upload-csv"
import UploadForm from "./upload-form"
import UploadLeads from "./leads"
import UserLogin from "./user-login"
import UserLogout from "./user-logout"
import UserRegister from "./user-register"

import { appModels } from "./types"
import config, { IConfig } from "./config"

import EmailCreator from "../models/email-creator/email-creator"
import EmailSenderAbstraction from "../models/emailsender/abstraction"
import EmailSenderNodeMailer from "../models/emailsender/nodemailer"
import EmailSenderConsole from "../models/emailsender/console"
import RestServer from "../rest/index"
import userSyntisize from "./user-syntisize"
import Users from "../models/users/users"
import LeadsModel from "../models/leads/leads"
import leads from "./leads"

export interface IModels {
  users: Users
  leads: LeadsModel
  emailCreator: EmailCreator
  emailSender: EmailSenderAbstraction
  config: IConfig
}

import SQL from "../models/mysql-pool/mysql-pool"

export default class AppLogic {
  public readonly config = config
  private sql = new SQL(config)

  public models: IModels = {
    users: new Users(this.sql),
    leads: new LeadsModel(this.sql),
    emailCreator: null,
    emailSender: null,
    config: this.config,
  }
  public leads = new leads(this.models)

  public userSyntisize = userSyntisize

  // private uploadCSV= new UploadCSV()
  private uploadForm = new UploadForm()
  private userLogout = new UserLogout()
  public userRegister = new UserRegister(this.models)
  public userLogin = new UserLogin(this)

  constructor(props?: {
    emailSender?: EmailSenderAbstraction
    emailCreator?: EmailCreator
  }) {
    if (!props) props = {}

    if (props.emailSender) {
      this.models.emailSender = props.emailSender
    } else {
      this.models.emailSender =
        config.mail.mailer == "CONSOLE"
          ? new EmailSenderConsole()
          : new EmailSenderConsole()
    }

    if (props.emailCreator) {
      this.models.emailCreator = props.emailCreator
    } else {
      this.models.emailCreator = new EmailCreator({ backend: "", from: "" })
    }
  }

  createServer = () => {
    var restServer = new RestServer({
      appLogic: this,
      env: "",
      frontend: "",
    })
    var httpServer = restServer.createHttpServer()
    return httpServer
  }

  createServerAndListen() {
    var httpServer = this.createServer()
    httpServer.listen(config.app.port, () => {
      console.log("listening on *:" + config.app.port)
    })
    return httpServer
  }
}
