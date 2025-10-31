import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils/test-utils';
import { MoodInput } from './MoodInput';

describe('MoodInput Component', () => {
  // =========================================
  // Rendering Tests
  // =========================================

  it('should render the mood input form', () => {
    render(<MoodInput onSubmit={vi.fn()} />);
    
    expect(screen.getByTestId('mood-input-form')).toBeInTheDocument();
    expect(screen.getByText('How are you feeling today?')).toBeInTheDocument();
  });

  it('should render all mood emoji buttons', () => {
    render(<MoodInput onSubmit={vi.fn()} />);
    
    const emojiButtons = screen.getAllByRole('button', { name: /sad|neutral|happy|excellent/i });
    expect(emojiButtons).toHaveLength(5);
  });

  it('should render energy and stress sliders', () => {
    render(<MoodInput onSubmit={vi.fn()} />);
    
    expect(screen.getByTestId('energy-slider')).toBeInTheDocument();
    expect(screen.getByTestId('stress-slider')).toBeInTheDocument();
  });

  it('should render notes textarea', () => {
    render(<MoodInput onSubmit={vi.fn()} />);
    
    expect(screen.getByTestId('mood-notes')).toBeInTheDocument();
  });

  it('should render submit button', () => {
    render(<MoodInput onSubmit={vi.fn()} />);
    
    expect(screen.getByTestId('submit-mood')).toBeInTheDocument();
  });

  // =========================================
  // Interaction Tests
  // =========================================

  it('should select a mood emoji when clicked', () => {
    render(<MoodInput onSubmit={vi.fn()} />);
    
    const veryHappyButton = screen.getByTestId('mood-9');
    fireEvent.click(veryHappyButton);
    
    expect(veryHappyButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should update energy level when slider changes', () => {
    render(<MoodInput onSubmit={vi.fn()} />);
    
    const energySlider = screen.getByTestId('energy-slider');
    fireEvent.change(energySlider, { target: { value: '8' } });
    
    expect(screen.getByText('Energy Level: 8/10')).toBeInTheDocument();
  });

  it('should update stress level when slider changes', () => {
    render(<MoodInput onSubmit={vi.fn()} />);
    
    const stressSlider = screen.getByTestId('stress-slider');
    fireEvent.change(stressSlider, { target: { value: '3' } });
    
    expect(screen.getByText('Stress Level: 3/10')).toBeInTheDocument();
  });

  it('should update notes when textarea changes', () => {
    render(<MoodInput onSubmit={vi.fn()} />);
    
    const notesTextarea = screen.getByTestId('mood-notes');
    fireEvent.change(notesTextarea, { target: { value: 'Feeling great today!' } });
    
    expect(notesTextarea).toHaveValue('Feeling great today!');
  });

  // =========================================
  // Form Submission Tests
  // =========================================

  it('should call onSubmit with correct data when form is submitted', async () => {
    const mockOnSubmit = vi.fn();
    render(<MoodInput onSubmit={mockOnSubmit} />);
    
    // Select mood
    fireEvent.click(screen.getByTestId('mood-9'));
    
    // Set energy level
    fireEvent.change(screen.getByTestId('energy-slider'), { target: { value: '8' } });
    
    // Set stress level
    fireEvent.change(screen.getByTestId('stress-slider'), { target: { value: '3' } });
    
    // Add notes
    fireEvent.change(screen.getByTestId('mood-notes'), { 
      target: { value: 'Had a productive day!' } 
    });
    
    // Submit form
    fireEvent.click(screen.getByTestId('submit-mood'));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        moodScore: 9,
        energyLevel: 8,
        stressLevel: 3,
        notes: 'Had a productive day!',
      });
    });
  });

  it('should reset form after successful submission', async () => {
    const mockOnSubmit = vi.fn();
    render(<MoodInput onSubmit={mockOnSubmit} />);
    
    // Fill form
    fireEvent.click(screen.getByTestId('mood-9'));
    fireEvent.change(screen.getByTestId('energy-slider'), { target: { value: '8' } });
    fireEvent.change(screen.getByTestId('mood-notes'), { target: { value: 'Test' } });
    
    // Submit
    fireEvent.click(screen.getByTestId('submit-mood'));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
    
    // Form should be reset
    expect(screen.getByTestId('mood-notes')).toHaveValue('');
    expect(screen.getByText('Energy Level: 5/10')).toBeInTheDocument();
  });

  it('should trim whitespace from notes', async () => {
    const mockOnSubmit = vi.fn();
    render(<MoodInput onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByTestId('mood-notes'), { 
      target: { value: '  Lots of spaces  ' } 
    });
    
    fireEvent.click(screen.getByTestId('submit-mood'));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          notes: 'Lots of spaces',
        })
      );
    });
  });

  // =========================================
  // Loading State Tests
  // =========================================

  it('should show loading state when isLoading is true', () => {
    render(<MoodInput onSubmit={vi.fn()} isLoading={true} />);
    
    expect(screen.getByText('Saving...')).toBeInTheDocument();
    expect(screen.getByTestId('submit-mood')).toBeDisabled();
  });

  it('should disable submit button when loading', () => {
    render(<MoodInput onSubmit={vi.fn()} isLoading={true} />);
    
    const submitButton = screen.getByTestId('submit-mood');
    expect(submitButton).toBeDisabled();
  });

  // =========================================
  // Accessibility Tests
  // =========================================

  it('should have proper ARIA labels', () => {
    render(<MoodInput onSubmit={vi.fn()} />);
    
    expect(screen.getByLabelText('Energy level slider')).toBeInTheDocument();
    expect(screen.getByLabelText('Stress level slider')).toBeInTheDocument();
    expect(screen.getByLabelText('Mood notes')).toBeInTheDocument();
  });

  it('should have role group for mood selection', () => {
    render(<MoodInput onSubmit={vi.fn()} />);
    
    expect(screen.getByRole('group', { name: 'Mood selection' })).toBeInTheDocument();
  });

  it('should have proper aria-pressed state on mood buttons', () => {
    render(<MoodInput onSubmit={vi.fn()} />);
    
    const neutralButton = screen.getByTestId('mood-5');
    expect(neutralButton).toHaveAttribute('aria-pressed', 'true'); // Default selection
    
    const happyButton = screen.getByTestId('mood-7');
    fireEvent.click(happyButton);
    
    expect(happyButton).toHaveAttribute('aria-pressed', 'true');
    expect(neutralButton).toHaveAttribute('aria-pressed', 'false');
  });
});

