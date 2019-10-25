export interface JiraAvatarUrls {
  "16x16": string;
  "24x24": string;
  "32x32": string;
  "48x48": string;
}

export interface JiraUser {
  accountId: string;
  accountType: string;
  active: boolean;
  avatarUrls: JiraAvatarUrls;
  displayName: string;
  emailAddress: string;
  key: string;
  name: string;
  self: string;
  timeZone: string;
}

export interface JiraIssue {
  id: string;
  key: string;
  self: string;
  fields: {
    assignee: JiraUser;
    created: string;
    creatore: JiraUser;
    issuetype: {
      description: string;
      iconUrl: string;
      id: string;
      name: string;
    };
    lastViewed: string;
    priority: {
      id: string;
      iconUrl: string;
      name: string;
    };
    project: {
      avatarUrls: JiraAvatarUrls;
      id: string;
      key: string;
      name: string;
    };
    reporter: JiraUser;
    status: {
      id: string;
      iconUrl: string;
      name: string;
      statusCategory: {
        colorName: string;
        id: string;
        key: string;
        name: string;
      };
    };
    summary: string;
    updated: string;
  };
}

export interface JiraSite {
  displayName: string;
  url: string;
}
