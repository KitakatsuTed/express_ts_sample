import BaseMailer from "./baseMailer";
import OrganizationUser from "../models/organizationUser";
import Organization from "../models/organization";
import User from "../models/user";
import ejs from "ejs"
import appRoot from 'app-root-path';

export default class OrganizationMailer extends BaseMailer {
  static async inviteMember(organizationUser: OrganizationUser) {
    const organization: Organization = await organizationUser.getOrganization()
    const user: User = await organizationUser.getUser()

    const html = await ejs.renderFile(
      appRoot + "/views/mailers/organizationMailer/inviteMember.ejs",
      { organization: organization, acceptPath: `${process.env.HOSTNAME}/organizations/${organization.id}/organization_users/accept` }
      );

    const mailData = {
      to: user.email,
      text: '組織に招待されました。',
      html: html,
      subject: '組織に招待されました'
    }

    await this.sendMail(mailData)
  }
}
