/**
 * Notification Service
 * Handles browser notification permissions, scheduling, and Web Push API
 */

export interface NotificationPreferences {
  enabled: boolean;
  moodReminder: boolean;
  journalReminder: boolean;
  aiChatReminder: boolean;
  moodReminderTime: string; // Format: "HH:MM"
  journalReminderTime: string;
  aiChatReminderTime: string;
}

class NotificationService {
  private static instance: NotificationService;
  private permission: NotificationPermission = 'default';

  private constructor() {
    this.permission = Notification.permission;
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  /**
   * Check if notifications are supported
   */
  public isSupported(): boolean {
    return 'Notification' in window;
  }

  /**
   * Request notification permission from user
   */
  public async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) {
      console.warn('Notifications are not supported in this browser');
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }

  /**
   * Get current notification permission status
   */
  public getPermission(): NotificationPermission {
    return this.permission;
  }

  /**
   * Show a notification
   */
  public async showNotification(
    title: string,
    options?: NotificationOptions
  ): Promise<void> {
    if (!this.isSupported()) {
      console.warn('Notifications are not supported');
      return;
    }

    if (this.permission !== 'granted') {
      console.warn('Notification permission not granted');
      return;
    }

    try {
      // If service worker is available, use it for persistent notifications
      if ('serviceWorker' in navigator && 'showNotification' in ServiceWorkerRegistration.prototype) {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification(title, {
          icon: '/logo.png',
          badge: '/logo.png',
          vibrate: [200, 100, 200],
          requireInteraction: false,
          ...options,
        });
      } else {
        // Fallback to regular notification
        new Notification(title, {
          icon: '/logo.png',
          ...options,
        });
      }
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  }

  /**
   * Schedule a daily reminder
   */
  public scheduleDailyReminder(
    type: 'mood' | 'journal' | 'aiChat',
    time: string // Format: "HH:MM"
  ): void {
    const [hours, minutes] = time.split(':').map(Number);
    
    const now = new Date();
    const scheduledTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      0
    );

    // If the time has already passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const timeUntilNotification = scheduledTime.getTime() - now.getTime();

    setTimeout(() => {
      this.sendReminderNotification(type);
      // Reschedule for next day
      this.scheduleDailyReminder(type, time);
    }, timeUntilNotification);
  }

  /**
   * Send a reminder notification based on type
   */
  private async sendReminderNotification(
    type: 'mood' | 'journal' | 'aiChat'
  ): Promise<void> {
    const notifications = {
      mood: {
        title: '🌟 Time to Check In!',
        body: 'How are you feeling today? Track your mood in SerenMind.',
        tag: 'mood-reminder',
        data: { url: '/dashboard' },
      },
      journal: {
        title: '📝 Journaling Time!',
        body: 'Take a moment to reflect on your day. Your thoughts matter.',
        tag: 'journal-reminder',
        data: { url: '/journal' },
      },
      aiChat: {
        title: '💬 Need Support?',
        body: 'Chat with your AI wellness companion for guidance and support.',
        tag: 'ai-chat-reminder',
        data: { url: '/chat' },
      },
    };

    const notification = notifications[type];
    await this.showNotification(notification.title, {
      body: notification.body,
      tag: notification.tag,
      data: notification.data,
      actions: [
        { action: 'open', title: 'Open SerenMind' },
        { action: 'dismiss', title: 'Later' },
      ],
    });
  }

  /**
   * Save notification preferences to localStorage
   */
  public savePreferences(prefs: NotificationPreferences): void {
    localStorage.setItem('notificationPreferences', JSON.stringify(prefs));
    
    // Clear any existing timers and reschedule
    this.applyPreferences(prefs);
  }

  /**
   * Load notification preferences from localStorage
   */
  public loadPreferences(): NotificationPreferences {
    const stored = localStorage.getItem('notificationPreferences');
    if (stored) {
      return JSON.parse(stored);
    }

    // Default preferences
    return {
      enabled: false,
      moodReminder: true,
      journalReminder: true,
      aiChatReminder: false,
      moodReminderTime: '09:00',
      journalReminderTime: '21:00',
      aiChatReminderTime: '15:00',
    };
  }

  /**
   * Apply notification preferences (schedule reminders)
   */
  public applyPreferences(prefs: NotificationPreferences): void {
    if (!prefs.enabled || this.permission !== 'granted') {
      return;
    }

    if (prefs.moodReminder) {
      this.scheduleDailyReminder('mood', prefs.moodReminderTime);
    }

    if (prefs.journalReminder) {
      this.scheduleDailyReminder('journal', prefs.journalReminderTime);
    }

    if (prefs.aiChatReminder) {
      this.scheduleDailyReminder('aiChat', prefs.aiChatReminderTime);
    }
  }

  /**
   * Initialize notification service (call on app startup)
   */
  public async initialize(): Promise<void> {
    if (!this.isSupported()) {
      return;
    }

    // Load and apply saved preferences
    const prefs = this.loadPreferences();
    if (prefs.enabled && this.permission === 'granted') {
      this.applyPreferences(prefs);
    }
  }
}

export const notificationService = NotificationService.getInstance();

