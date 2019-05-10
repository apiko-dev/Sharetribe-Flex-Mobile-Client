import { types as t, getRoot } from 'mobx-state-tree';
import { Image } from './ImageStore';

const UserRelationships = t.model('ProductRelationships', {
  profileImage: t.maybe(t.safeReference(t.late(() => Image))),
});

const PublicData = t.model('PublicData', {
  phoneNumber: t.maybe(t.string),
});
const ProtectedData = t.model('ProtectedData', {
  // phoneNumber: t.maybe(t.string),
});
const PrivateData = t.model('PrivateData', {
  // discoveredServiceVia: t.string,
});

const Profile = t.model('Profile', {
  firstName: t.maybe(t.string),
  lastName: t.maybe(t.string),
  displayName: t.maybe(t.string),
  abbreviatedName: t.maybe(t.string),
  bio: t.maybeNull(t.string),
  publicData: t.optional(PublicData, {}),
  protectedData: t.optional(ProtectedData, {}),
  privateData: t.optional(PrivateData, {}),
});

export const User = t
  .model('User', {
    id: t.identifier,
    banned: t.maybe(t.boolean),
    deleted: t.maybe(t.boolean),
    createdAt: t.maybe(t.Date),
    profile: t.maybe(Profile),
    email: t.maybe(t.string),
    emailVerified: t.maybe(t.boolean),
    pendingEmail: t.maybe(t.null),
    stripePayoutsEnabled: t.maybe(t.boolean),
    stripeChargesEnabled: t.maybe(t.boolean),
    stripeConnected: t.maybe(t.boolean),
    relationships: t.optional(UserRelationships, {}),
  })

  .views((store) => ({
    get isViewer() {
      const { user } = getRoot(store).viewer;

      return user && user.id === store && store.id;
    },
  }));
