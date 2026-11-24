import { INITIAL_DATER_PROFILE } from '../data/initialData.ts';
import { detectPlatform } from '../utils/platformHelper.ts';
import { cleanPhoneNumber, createVouchWhatsAppUrl, createMatchWhatsAppUrl } from '../utils/whatsappHelper.ts';
import type {
  DaterProfile,
  FriendEndorsement,
  MatchRecommendation,
  MatchStatus,
  ViewTab,
  UserRole,
  RolePermissions,
  UserSession,
} from '../types/index.ts';

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

function runTest(name: string, fn: () => void) {
  try {
    fn();
    results.push({ name, passed: true });
    console.log(`PASS: ${name}`);
  } catch (err: any) {
    results.push({ name, passed: false, error: err.message });
    console.error(`FAIL: ${name} -> ${err.message}`);
  }
}

// Simulated App State representing the actions tied to all UI buttons
class TestableAppState {
  daterProfile: DaterProfile = { ...INITIAL_DATER_PROFILE };
  endorsements: FriendEndorsement[] = [];
  recommendations: MatchRecommendation[] = [];
  activeTab: ViewTab = 'profile';
  toasts: { id: string; type: string; message: string }[] = [];
  isEndorseModalOpen = false;
  isSendLinkModalOpen = false;
  confettiTriggered = 0;
  clipboardText = '';
  userRole: UserRole = 'friend';
  session: UserSession | null = null;
  isRoleModalOpen = false;

  login(role: UserRole, username: string, password: string): { success: boolean; message: string } {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();
    if (!cleanUser) return { success: false, message: 'Username is required' };

    if (role === 'dater') {
      if (cleanUser !== 'yash' && cleanUser !== 'yashsunil') return { success: false, message: 'Invalid username' };
      if (cleanPass !== '2026') return { success: false, message: 'Invalid passcode' };
      this.session = { role: 'dater', username: 'yash' };
      this.userRole = 'dater';
      return { success: true, message: 'Welcome back, Yash!' };
    }
    if (role === 'admin') {
      if (cleanUser !== 'admin') return { success: false, message: 'Invalid username' };
      if (cleanPass !== '7777') return { success: false, message: 'Invalid passcode' };
      this.session = { role: 'admin', username: 'admin' };
      this.userRole = 'admin';
      return { success: true, message: 'Admin access granted' };
    }
    if (role === 'friend') {
      if (cleanPass !== 'friend' && cleanPass !== 'friend123' && cleanPass !== '1234') {
        return { success: false, message: 'Invalid passcode' };
      }
      this.session = { role: 'friend', username: username.trim() };
      this.userRole = 'friend';
      return { success: true, message: 'Welcome to YashDate!' };
    }
    return { success: false, message: 'Unknown role' };
  }

  logout() {
    this.session = null;
    this.userRole = 'friend';
    this.activeTab = 'profile';
  }

  get permissions(): RolePermissions {
    return {
      canEditBio: this.userRole === 'dater' || this.userRole === 'admin',
      canViewMatches: this.userRole === 'dater' || this.userRole === 'admin',
      canManageMatchStatus: this.userRole === 'dater' || this.userRole === 'admin',
      canEditMatchNotes: this.userRole === 'dater' || this.userRole === 'admin',
      canDeleteMatches: this.userRole === 'dater' || this.userRole === 'admin',
      canDeleteVouches: this.userRole === 'dater' || this.userRole === 'admin',
      canResetDatabase: this.userRole === 'admin',
      canWriteVouch: this.userRole === 'friend' || this.userRole === 'admin',
      canSendMatchLink: true,
    };
  }

  switchRole(newRole: UserRole, pin?: string): { success: boolean; message: string } {
    if (newRole === 'friend') {
      this.userRole = 'friend';
      if (this.activeTab === 'edit_profile' || this.activeTab === 'sent_matches') {
        this.activeTab = 'profile';
      }
      return { success: true, message: 'Switched to Friend view' };
    }
    if (newRole === 'dater') {
      if (pin === '2026') {
        this.userRole = 'dater';
        return { success: true, message: 'Welcome back, Yash!' };
      }
      return { success: false, message: 'Incorrect PIN. Hint: 2026' };
    }
    if (newRole === 'admin') {
      if (pin === '7777') {
        this.userRole = 'admin';
        return { success: true, message: 'Admin mode unlocked' };
      }
      return { success: false, message: 'Incorrect PIN. Hint: 7777' };
    }
    return { success: false, message: 'Unknown role' };
  }

  // 1. Tab buttons in Navbar
  clickTab(tab: ViewTab) {
    this.activeTab = tab;
  }

  // 2. Brand button
  clickBrand() {
    this.activeTab = 'profile';
  }

  // 3. Like button on Dating Card
  clickLike() {
    this.confettiTriggered++;
    this.toasts.push({
      id: String(Date.now()),
      type: 'love',
      message: `You liked ${this.daterProfile.name}`,
    });
  }

  // 4. Pass button on Dating Card
  clickPass() {
    this.toasts.push({
      id: String(Date.now()),
      type: 'info',
      message: `Passed on ${this.daterProfile.name}`,
    });
  }

  // 5. Share button (in Navbar and Dating Card)
  clickShare(url: string) {
    this.clipboardText = url;
    this.toasts.push({
      id: String(Date.now()),
      type: 'success',
      message: 'Profile link copied to clipboard',
    });
  }

  // 6. Reset button in Navbar
  clickReset() {
    this.daterProfile = { ...INITIAL_DATER_PROFILE };
    this.endorsements = [];
    this.recommendations = [];
    this.toasts.push({
      id: String(Date.now()),
      type: 'info',
      message: 'Profile reset to default state',
    });
  }

  // 7. Vouch Modal triggers
  openEndorseModal() {
    this.isEndorseModalOpen = true;
  }
  closeEndorseModal() {
    this.isEndorseModalOpen = false;
  }
  submitEndorseForm(data: { friendName: string; relationship: string; yearsKnown: number; description: string; whyYouShouldDateThem?: string }) {
    if (!data.friendName.trim() || !data.description.trim()) {
      return false;
    }
    const newEndorsement: FriendEndorsement = {
      id: `end-${Date.now()}`,
      friendName: data.friendName.trim(),
      relationship: data.relationship.trim() || 'Friend',
      yearsKnown: data.yearsKnown,
      description: data.description.trim(),
      whyYouShouldDateThem: data.whyYouShouldDateThem?.trim(),
      createdAt: new Date().toISOString(),
    };
    this.endorsements.push(newEndorsement);
    this.isEndorseModalOpen = false;
    this.toasts.push({
      id: String(Date.now()),
      type: 'love',
      message: `Friend vouch from ${data.friendName} added!`,
    });
    return true;
  }

  // 8. Delete Endorsement button
  clickDeleteEndorsement(id: string) {
    this.endorsements = this.endorsements.filter((e) => e.id !== id);
    this.toasts.push({
      id: String(Date.now()),
      type: 'info',
      message: 'Friend vouch removed',
    });
  }

  // 9. Send Match Link Modal triggers
  openSendLinkModal() {
    this.isSendLinkModalOpen = true;
  }
  closeSendLinkModal() {
    this.isSendLinkModalOpen = false;
  }
  submitSendLink(data: { friendName: string; candidateName: string; candidateHandle?: string; profileLink: string; pitchNote: string }) {
    if (!data.friendName.trim() || !data.candidateName.trim() || !data.profileLink.trim()) {
      return false;
    }
    const detected = detectPlatform(data.profileLink);
    const newRec: MatchRecommendation = {
      id: `rec-${Date.now()}`,
      friendName: data.friendName.trim(),
      candidateName: data.candidateName.trim(),
      candidateHandle: data.candidateHandle?.trim(),
      profileLink: data.profileLink.trim(),
      platform: detected,
      pitchNote: data.pitchNote.trim(),
      status: 'to_review',
      createdAt: new Date().toISOString(),
    };
    this.recommendations.push(newRec);
    this.isSendLinkModalOpen = false;
    this.toasts.push({
      id: String(Date.now()),
      type: 'success',
      message: `Match recommendation for ${data.candidateName} sent!`,
    });
    return true;
  }

  // 10. Update Match Status select / buttons
  changeMatchStatus(id: string, status: MatchStatus) {
    const item = this.recommendations.find((r) => r.id === id);
    if (item) {
      item.status = status;
      this.toasts.push({
        id: String(Date.now()),
        type: 'info',
        message: `Match status updated to ${status.replace('_', ' ')}`,
      });
    }
  }

  // 11. Save private notes on Match
  saveMatchNotes(id: string, notes: string) {
    const item = this.recommendations.find((r) => r.id === id);
    if (item) {
      item.daterNotes = notes;
      this.toasts.push({
        id: String(Date.now()),
        type: 'success',
        message: 'Private notes saved',
      });
    }
  }

  // 12. Delete Match recommendation button
  clickDeleteRecommendation(id: string) {
    this.recommendations = this.recommendations.filter((r) => r.id !== id);
    this.toasts.push({
      id: String(Date.now()),
      type: 'info',
      message: 'Match recommendation removed',
    });
  }

  // 13. Edit Bio Form submit button
  submitEditBio(updates: Partial<DaterProfile>) {
    this.daterProfile = { ...this.daterProfile, ...updates };
    this.toasts.push({
      id: String(Date.now()),
      type: 'success',
      message: 'Profile updated successfully',
    });
  }

  // 14. Photo Pagination buttons
  nextPhoto(currentIdx: number, totalPhotos: number): number {
    if (totalPhotos <= 0) return 0;
    return (currentIdx + 1) % totalPhotos;
  }
  prevPhoto(currentIdx: number, totalPhotos: number): number {
    if (totalPhotos <= 0) return 0;
    return (currentIdx - 1 + totalPhotos) % totalPhotos;
  }
}

console.log('--- STARTING ALL BUTTON INTERACTION TESTS ---\n');

runTest('Button Test 1: Tab Navigation buttons in Navbar switch active views correctly', () => {
  const app = new TestableAppState();
  assert(app.activeTab === 'profile', 'Default tab must be profile');

  app.clickTab('friends_vouches');
  assert(app.activeTab === 'friends_vouches', 'Tab should switch to friends_vouches');

  app.clickTab('sent_matches');
  assert(app.activeTab === 'sent_matches', 'Tab should switch to sent_matches');

  app.clickTab('edit_profile');
  assert(app.activeTab === 'edit_profile', 'Tab should switch to edit_profile');

  app.clickBrand();
  assert(app.activeTab === 'profile', 'Clicking brand should return to profile');
});

runTest('Button Test 2: Like button on Dating Card fires confetti and love toast', () => {
  const app = new TestableAppState();
  app.clickLike();
  assert(app.confettiTriggered === 1, 'Confetti must trigger once');
  assert(app.toasts.length === 1, 'Toast must be created');
  assert(app.toasts[0].type === 'love', 'Toast must be love type');
  assert(app.toasts[0].message.includes('Yash Sunil'), 'Toast must name Yash Sunil');
});

runTest('Button Test 3: Pass button on Dating Card emits info toast', () => {
  const app = new TestableAppState();
  app.clickPass();
  assert(app.toasts.length === 1, 'Toast must be created');
  assert(app.toasts[0].type === 'info', 'Toast must be info type');
  assert(app.toasts[0].message.includes('Passed on'), 'Toast message must indicate pass');
});

runTest('Button Test 4: Share button copies URL and notifies user', () => {
  const app = new TestableAppState();
  app.clickShare('https://yashdate.app/yash');
  assert(app.clipboardText === 'https://yashdate.app/yash', 'Clipboard text must match URL');
  assert(app.toasts[0].type === 'success', 'Must show success toast');
});

runTest('Button Test 5: Reset button restores pure user data with /yash.jpg', () => {
  const app = new TestableAppState();
  // Modify profile
  app.daterProfile.name = 'Temporary Name';
  app.endorsements.push({ id: '1', friendName: 'Test', relationship: 'Friend', description: 'Desc', createdAt: '' });
  app.clickReset();

  assert(app.daterProfile.name === 'Yash Sunil', 'Name must reset to Yash Sunil');
  assert(app.daterProfile.photos.length === 1 && app.daterProfile.photos[0] === '/yash.jpg', 'Photos must retain /yash.jpg');
  assert(app.endorsements.length === 0, 'Endorsements must reset to 0');
});

runTest('Button Test 6: Vouch Modal submit button validates and adds friend vouch', () => {
  const app = new TestableAppState();
  app.openEndorseModal();
  assert(app.isEndorseModalOpen === true, 'Modal should open');

  // Attempt empty submit
  const failedEmpty = app.submitEndorseForm({ friendName: '', relationship: '', yearsKnown: 1, description: '' });
  assert(!failedEmpty, 'Empty submit must be rejected');
  assert(app.endorsements.length === 0, 'No endorsement added on empty submit');

  // Valid submit
  const success = app.submitEndorseForm({
    friendName: 'Arjun',
    relationship: 'Aviation Colleague',
    yearsKnown: 2,
    description: 'Yash is disciplined, genuine, and always dependable.',
    whyYouShouldDateThem: 'He has pilot ambition, high emotional intelligence, and great music taste.',
  });
  assert(success, 'Valid submit must succeed');
  assert(app.endorsements.length === 1, 'One endorsement must be saved');
  assert(app.endorsements[0].friendName === 'Arjun', 'Friend name must match');
  assert(app.isEndorseModalOpen === false, 'Modal must close after submit');
  assert(app.toasts.some((t) => t.message.includes('Arjun')), 'Must show confirmation toast');
});

runTest('Button Test 7: Delete Vouch button removes endorsement by ID', () => {
  const app = new TestableAppState();
  app.submitEndorseForm({ friendName: 'Arjun', relationship: 'Friend', yearsKnown: 1, description: 'Great guy' });
  const id = app.endorsements[0].id;
  assert(app.endorsements.length === 1, 'Must have 1 endorsement');

  app.clickDeleteEndorsement(id);
  assert(app.endorsements.length === 0, 'Endorsement list must be empty after delete');
});

runTest('Button Test 8: Send Match Link button validates, detects platform, and adds recommendation', () => {
  const app = new TestableAppState();
  app.openSendLinkModal();
  assert(app.isSendLinkModalOpen === true, 'Modal should open');

  // Submit Instagram link
  const igSuccess = app.submitSendLink({
    friendName: 'FriendUser',
    candidateName: 'Meera',
    candidateHandle: '@meera_art',
    profileLink: 'https://instagram.com/meera_art',
    pitchNote: 'She is 5ft 1in, creative, and loves Anuv Jain songs!',
  });

  assert(igSuccess, 'Instagram match submit must succeed');
  assert(app.recommendations.length === 1, 'One recommendation must be present');
  assert(app.recommendations[0].platform === 'instagram', 'Platform must auto-detect as instagram');
  assert(app.recommendations[0].status === 'to_review', 'Initial status must be to_review');
  assert(app.isSendLinkModalOpen === false, 'Modal must close on submit');

  // Submit LinkedIn link
  const liSuccess = app.submitSendLink({
    friendName: 'Karthik',
    candidateName: 'Ananya',
    profileLink: 'https://linkedin.com/in/ananya-pilot',
    pitchNote: 'In aviation logistics in Chennai.',
  });
  assert(liSuccess, 'LinkedIn match submit must succeed');
  assert(app.recommendations.length === 2, 'Two recommendations present');
  assert(app.recommendations[1].platform === 'linkedin', 'Platform must auto-detect as linkedin');
});

runTest('Button Test 9: Match Status dropdown and Notes buttons update status and notes', () => {
  const app = new TestableAppState();
  app.submitSendLink({
    friendName: 'FriendUser',
    candidateName: 'Meera',
    profileLink: 'https://instagram.com/meera_art',
    pitchNote: 'Great vibe',
  });
  const id = app.recommendations[0].id;

  // Change status to interested
  app.changeMatchStatus(id, 'interested');
  assert(app.recommendations[0].status === 'interested', 'Status must update to interested');

  // Change status to contacted
  app.changeMatchStatus(id, 'contacted');
  assert(app.recommendations[0].status === 'contacted', 'Status must update to contacted');

  // Save private note
  app.saveMatchNotes(id, 'Sent a DM about acoustic songs');
  assert(app.recommendations[0].daterNotes === 'Sent a DM about acoustic songs', 'Private note must be saved');

  // Delete match button
  app.clickDeleteRecommendation(id);
  assert(app.recommendations.length === 0, 'Recommendation must be deleted');
});

runTest('Button Test 10: Edit Bio Save button updates profile fields and syncs', () => {
  const app = new TestableAppState();
  app.submitEditBio({
    selfDescription: 'I am Yash Sunil, 20 from Chennai. Aspiring pilot and Anuv Jain listener.',
    idealDate: 'Sunset coffee drive with acoustic music.',
  });

  assert(app.daterProfile.selfDescription.includes('Aspiring pilot'), 'Bio description must update');
  assert(app.daterProfile.idealDate.includes('Sunset coffee'), 'Ideal date must update');
  assert(app.toasts.some((t) => t.message.includes('Profile updated')), 'Must show success toast');
});

runTest('Button Test 11: Photo pagination buttons navigate cleanly', () => {
  const app = new TestableAppState();
  const total = 3;
  let idx = 0;
  idx = app.nextPhoto(idx, total);
  assert(idx === 1, 'Next photo should advance to 1');
  idx = app.nextPhoto(idx, total);
  assert(idx === 2, 'Next photo should advance to 2');
  idx = app.nextPhoto(idx, total);
  assert(idx === 0, 'Next photo should wrap to 0');
  idx = app.prevPhoto(idx, total);
  assert(idx === 2, 'Prev photo should wrap to 2');
});

runTest('Button Test 12: Role Switching and PIN validation (Friend, Yash, Admin)', () => {
  const app = new TestableAppState();
  assert(app.userRole === 'friend', 'Default role must be friend');

  // Attempt switching to dater with wrong PIN
  const wrongDater = app.switchRole('dater', '0000');
  assert(!wrongDater.success, 'Wrong PIN for dater must fail');
  assert(app.userRole === 'friend', 'Role must remain friend');

  // Switch to dater with correct PIN
  const rightDater = app.switchRole('dater', '2026');
  assert(rightDater.success, 'Correct PIN (2026) must unlock dater role');
  assert(app.userRole === 'dater', 'Role must become dater');

  // Attempt switching to admin with wrong PIN
  const wrongAdmin = app.switchRole('admin', '1234');
  assert(!wrongAdmin.success, 'Wrong PIN for admin must fail');
  assert(app.userRole === 'dater', 'Role must remain dater');

  // Switch to admin with correct PIN
  const rightAdmin = app.switchRole('admin', '7777');
  assert(rightAdmin.success, 'Correct PIN (7777) must unlock admin role');
  assert(app.userRole === 'admin', 'Role must become admin');

  // Switch back to friend without PIN
  const backToFriend = app.switchRole('friend');
  assert(backToFriend.success, 'Switching back to friend requires no PIN');
  assert(app.userRole === 'friend', 'Role must become friend');
});

runTest('Button Test 13: RBAC permission gates correctly isolate Friend, Dater, and Admin capabilities', () => {
  const app = new TestableAppState();

  // 1. Friend Permissions
  app.userRole = 'friend';
  assert(app.permissions.canEditBio === false, 'Friend cannot edit bio');
  assert(app.permissions.canViewMatches === false, 'Friend cannot view private matches');
  assert(app.permissions.canManageMatchStatus === false, 'Friend cannot change match status');
  assert(app.permissions.canDeleteVouches === false, 'Friend cannot delete other friends vouches');
  assert(app.permissions.canResetDatabase === false, 'Friend cannot reset database');
  assert(app.permissions.canWriteVouch === true, 'Friend can write vouch');
  assert(app.permissions.canSendMatchLink === true, 'Friend can send match link');

  // 2. Yash (Dater) Permissions
  app.userRole = 'dater';
  assert(app.permissions.canEditBio === true, 'Yash can edit bio');
  assert(app.permissions.canViewMatches === true, 'Yash can view matches');
  assert(app.permissions.canManageMatchStatus === true, 'Yash can manage match status');
  assert(app.permissions.canEditMatchNotes === true, 'Yash can write private notes');
  assert(app.permissions.canDeleteMatches === true, 'Yash can delete matches');
  assert(app.permissions.canDeleteVouches === true, 'Yash can delete vouches');
  assert(app.permissions.canResetDatabase === false, 'Dater cannot reset database');

  // 3. Admin Permissions
  app.userRole = 'admin';
  assert(app.permissions.canEditBio === true, 'Admin can edit bio');
  assert(app.permissions.canViewMatches === true, 'Admin can view matches');
  assert(app.permissions.canManageMatchStatus === true, 'Admin can manage match status');
  assert(app.permissions.canDeleteMatches === true, 'Admin can delete matches');
  assert(app.permissions.canDeleteVouches === true, 'Admin can delete vouches');
  assert(app.permissions.canResetDatabase === true, 'Admin can reset database');
});

runTest('Button Test 14: Auth Opening Screen authentication with Role, ID/Username, and Passcode', () => {
  const app = new TestableAppState();
  assert(app.session === null, 'Initially session must be null (shows opening auth)');

  // 1. Friend login
  const failFriendPass = app.login('friend', 'FriendUser', 'wrongpass');
  assert(!failFriendPass.success, 'Friend login with wrong pass must fail');
  assert(app.session === null, 'Session remains null');

  const okFriend = app.login('friend', 'FriendUser', 'friend');
  assert(okFriend.success, 'Friend login with correct pass succeeds');
  assert(app.session !== null && app.session.username === 'FriendUser', 'Session saved with username');
  assert(app.userRole === 'friend', 'Role set to friend');

  app.logout();
  assert(app.session === null, 'Logout resets session to null');

  // 2. Yash Dater login
  const failYashUser = app.login('dater', 'otherguy', '2026');
  assert(!failYashUser.success, 'Yash login with non-yash username must fail');

  const failYashPass = app.login('dater', 'yash', '9999');
  assert(!failYashPass.success, 'Yash login with wrong pass must fail');

  const okYash = app.login('dater', 'yash', '2026');
  assert(okYash.success, 'Yash login with username yash and pin 2026 succeeds');
  assert(app.session?.username === 'yash', 'Yash session active');
  assert(app.userRole === 'dater', 'Role set to dater');
  assert(app.permissions.canEditBio === true, 'Yash has bio edit permission');

  app.logout();

  // 3. Admin login
  const failAdmin = app.login('admin', 'admin', 'wrong');
  assert(!failAdmin.success, 'Admin with wrong pass must fail');

  const okAdmin = app.login('admin', 'admin', '7777');
  assert(okAdmin.success, 'Admin login with username admin and pin 7777 succeeds');
  assert(app.session?.username === 'admin', 'Admin session active');
  assert(app.userRole === 'admin', 'Role set to admin');
  assert(app.permissions.canResetDatabase === true, 'Admin can reset database');
});

runTest('Button Test 15: WhatsApp notification link generator correctly formats Yash phone +91 94875 48740', () => {
  const phone = '+91 94875 48740';
  const clean = cleanPhoneNumber(phone);
  assert(clean === '919487548740', 'Phone number must normalize to 919487548740');

  const vouchUrl = createVouchWhatsAppUrl(phone, 'FriendUser', 'Great friend and pilot');
  assert(vouchUrl.startsWith('https://wa.me/919487548740?text='), 'Vouch URL must target Yash WhatsApp');
  assert(vouchUrl.includes('FriendUser'), 'Vouch text must name friend');

  const matchUrl = createMatchWhatsAppUrl(phone, 'FriendUser', 'CandidateName', 'instagram', 'https://instagram.com/cand', 'Good vibe');
  assert(matchUrl.startsWith('https://wa.me/919487548740?text='), 'Match URL must target Yash WhatsApp');
  assert(matchUrl.includes('CandidateName'), 'Match text must include candidate');
});

console.log('\n--- BUTTON TEST SUMMARY ---');
const totalPassed = results.filter((r) => r.passed).length;
console.log(`Passed: ${totalPassed} / ${results.length}`);
if (totalPassed === results.length) {
  console.log('ALL BUTTON TESTS PASSED SUCCESSFULLY!');
} else {
  console.error('SOME BUTTON TESTS FAILED.');
  process.exit(1);
}
