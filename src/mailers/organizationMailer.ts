import BaseMailer from "./baseMailer";
import OrganizationUser from "../models/organizationUser";
import Organization from "../models/organization";
import User from "../models/user";

export default class OrganizationMailer extends BaseMailer {
  static async inviteMember(organizationUser: OrganizationUser) {
    const organization: Organization = await organizationUser.getOrganization()
    const user: User = await organizationUser.getUser()
    const mailData = {
      to: user.email,
      text: '組織に招待されました。',
      html: `組織に招待されました。<a href="/organizations/${organization.id}/organizatin_users/accept" methods="post">こちら</a>から承認してください。`,
      subject: '組織に招待されました'
    }

    await this.sendMail(mailData)
  }
}
