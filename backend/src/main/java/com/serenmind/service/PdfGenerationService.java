package com.serenmind.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.lowagie.text.pdf.draw.LineSeparator;
import com.serenmind.model.AiReport;
import com.serenmind.model.JournalEntry;
import com.serenmind.model.MoodEntry;
import com.serenmind.repository.JournalEntryRepository;
import com.serenmind.repository.MoodEntryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * Service for generating PDF reports using OpenPDF.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class PdfGenerationService {

    private final MoodEntryRepository moodEntryRepository;
    private final JournalEntryRepository journalEntryRepository;

    // Design tokens matching SerenMind UI
    private static final Color PEACH_ACCENT = new Color(246, 215, 195);
    private static final Color SAGE_ACCENT = new Color(207, 239, 230);
    private static final Color TEXT_DARK = new Color(30, 41, 59);
    private static final Color TEXT_GRAY = new Color(100, 116, 139);

    /**
     * Generate PDF from AiReport entity.
     */
    public byte[] generateReportPdf(AiReport report) throws DocumentException {
        log.info("Generating PDF for report ID: {}", report.getId());

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4, 50, 50, 50, 50);

        try {
            PdfWriter.getInstance(document, outputStream);
            document.open();

            // Add header with logo/title
            addHeader(document, report);

            // Add spacing
            document.add(new Paragraph(" "));

            // Add report metadata
            addMetadata(document, report);

            // Add spacing
            document.add(new Paragraph(" "));

            // Get user's recent data (last 3 entries)
            List<MoodEntry> recentMoods = moodEntryRepository
                    .findByUserOrderByTimestampDesc(report.getUser(), PageRequest.of(0, 3));
            List<JournalEntry> recentJournals = journalEntryRepository
                    .findByUserOrderByCreatedAtDesc(report.getUser(), PageRequest.of(0, 3));

            // Add mood entries section
            if (!recentMoods.isEmpty()) {
                addMoodEntriesSection(document, recentMoods);
                document.add(new Paragraph(" "));
            }

            // Add journal entries section
            if (!recentJournals.isEmpty()) {
                addJournalEntriesSection(document, recentJournals);
                document.add(new Paragraph(" "));
            }

            // Add AI insights/content section
            addContentSection(document, "AI Insights & Analysis", report.getContent());

            // Add spacing
            document.add(new Paragraph(" "));

            // Add footer
            addFooter(document);

            document.close();
            log.info("PDF generated successfully for report ID: {}", report.getId());
        } catch (DocumentException e) {
            log.error("Error generating PDF for report ID: {}", report.getId(), e);
            throw e;
        }

        return outputStream.toByteArray();
    }

    /**
     * Add header to PDF.
     */
    private void addHeader(Document document, AiReport report) throws DocumentException {
        // Title
        Font titleFont = new Font(Font.TIMES_ROMAN, 24, Font.BOLD);
        titleFont.setColor(TEXT_DARK);

        Paragraph title = new Paragraph("SerenMind Wellness Report", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(10);
        document.add(title);

        // Subtitle (report type)
        Font subtitleFont = new Font(Font.HELVETICA, 12, Font.ITALIC);
        subtitleFont.setColor(TEXT_GRAY);

        Paragraph subtitle = new Paragraph(report.getReportType().toUpperCase() + " REPORT", subtitleFont);
        subtitle.setAlignment(Element.ALIGN_CENTER);
        subtitle.setSpacingAfter(20);
        document.add(subtitle);

        // Line separator
        LineSeparator line = new LineSeparator(1, 100, PEACH_ACCENT, Element.ALIGN_CENTER, -2);
        document.add(line);
    }

    /**
     * Add metadata section to PDF.
     */
    private void addMetadata(Document document, AiReport report) throws DocumentException {
        Font labelFont = new Font(Font.HELVETICA, 10, Font.BOLD);
        labelFont.setColor(TEXT_GRAY);

        Font valueFont = new Font(Font.HELVETICA, 10, Font.NORMAL);
        valueFont.setColor(TEXT_DARK);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

        Paragraph metadata = new Paragraph();
        metadata.add(new Chunk("Generated On: ", labelFont));
        metadata.add(new Chunk(report.getCreatedAt().format(formatter), valueFont));
        metadata.add(new Chunk("\nUser ID: ", labelFont));
        metadata.add(new Chunk(report.getUser().getId().toString(), valueFont));

        metadata.setSpacingAfter(20);
        document.add(metadata);
    }

    /**
     * Add a content section to PDF.
     */
    private void addContentSection(Document document, String sectionTitle, String content) throws DocumentException {
        // Section title
        Font headingFont = new Font(Font.HELVETICA, 14, Font.BOLD);
        headingFont.setColor(TEXT_DARK);

        Paragraph heading = new Paragraph(sectionTitle, headingFont);
        heading.setSpacingBefore(10);
        heading.setSpacingAfter(5);
        document.add(heading);

        // Section line
        LineSeparator line = new LineSeparator(0.5f, 100, SAGE_ACCENT, Element.ALIGN_LEFT, -2);
        document.add(line);

        // Content
        Font contentFont = new Font(Font.HELVETICA, 11, Font.NORMAL);
        contentFont.setColor(TEXT_DARK);

        Paragraph contentPara = new Paragraph(content, contentFont);
        contentPara.setAlignment(Element.ALIGN_JUSTIFIED);
        contentPara.setSpacingBefore(10);
        contentPara.setSpacingAfter(15);
        contentPara.setLeading(16);
        document.add(contentPara);
    }

    /**
     * Add mood entries section to PDF.
     */
    private void addMoodEntriesSection(Document document, List<MoodEntry> moods) throws DocumentException {
        // Section title
        Font headingFont = new Font(Font.HELVETICA, 14, Font.BOLD);
        headingFont.setColor(TEXT_DARK);

        Paragraph heading = new Paragraph("📊 Recent Mood Entries (Last 3)", headingFont);
        heading.setSpacingBefore(10);
        heading.setSpacingAfter(5);
        document.add(heading);

        // Section line
        LineSeparator line = new LineSeparator(0.5f, 100, PEACH_ACCENT, Element.ALIGN_LEFT, -2);
        document.add(line);

        document.add(new Paragraph(" "));

        // Create table for mood entries
        PdfPTable table = new PdfPTable(5); // 5 columns: Date, Mood, Score, Energy, Stress
        table.setWidthPercentage(100);
        table.setSpacingBefore(10);
        table.setSpacingAfter(10);

        // Table header
        Font headerFont = new Font(Font.HELVETICA, 9, Font.BOLD);
        headerFont.setColor(Color.WHITE);

        String[] headers = {"Date", "Mood", "Score", "Energy", "Stress"};
        for (String header : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(header, headerFont));
            cell.setBackgroundColor(TEXT_DARK);
            cell.setPadding(5);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
        }

        // Table data
        Font dataFont = new Font(Font.HELVETICA, 9, Font.NORMAL);
        dataFont.setColor(TEXT_DARK);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy");

        for (MoodEntry mood : moods) {
            // Date
            PdfPCell dateCell = new PdfPCell(new Phrase(mood.getTimestamp().format(formatter), dataFont));
            dateCell.setPadding(5);
            table.addCell(dateCell);

            // Mood (with emoji)
            String moodText = getMoodWithEmoji(mood.getMoodScore());
            PdfPCell moodCell = new PdfPCell(new Phrase(moodText, dataFont));
            moodCell.setPadding(5);
            table.addCell(moodCell);

            // Score
            PdfPCell scoreCell = new PdfPCell(new Phrase(mood.getMoodScore() + "/10", dataFont));
            scoreCell.setPadding(5);
            scoreCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(scoreCell);

            // Energy
            PdfPCell energyCell = new PdfPCell(new Phrase(mood.getEnergyLevel() + "/10", dataFont));
            energyCell.setPadding(5);
            energyCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(energyCell);

            // Stress
            PdfPCell stressCell = new PdfPCell(new Phrase(mood.getStressLevel() + "/10", dataFont));
            stressCell.setPadding(5);
            stressCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(stressCell);
        }

        document.add(table);
    }

    /**
     * Add journal entries section to PDF.
     */
    private void addJournalEntriesSection(Document document, List<JournalEntry> journals) throws DocumentException {
        // Section title
        Font headingFont = new Font(Font.HELVETICA, 14, Font.BOLD);
        headingFont.setColor(TEXT_DARK);

        Paragraph heading = new Paragraph("📝 Recent Journal Entries (Last 3)", headingFont);
        heading.setSpacingBefore(10);
        heading.setSpacingAfter(5);
        document.add(heading);

        // Section line
        LineSeparator line = new LineSeparator(0.5f, 100, SAGE_ACCENT, Element.ALIGN_LEFT, -2);
        document.add(line);

        document.add(new Paragraph(" "));

        // Font for journal entries
        Font titleFont = new Font(Font.HELVETICA, 11, Font.BOLD);
        titleFont.setColor(TEXT_DARK);

        Font dateFont = new Font(Font.HELVETICA, 9, Font.ITALIC);
        dateFont.setColor(TEXT_GRAY);

        Font contentFont = new Font(Font.HELVETICA, 10, Font.NORMAL);
        contentFont.setColor(TEXT_DARK);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy");

        for (int i = 0; i < journals.size(); i++) {
            JournalEntry journal = journals.get(i);

            // Entry number and title
            Paragraph entryTitle = new Paragraph((i + 1) + ". " + journal.getTitle(), titleFont);
            entryTitle.setSpacingBefore(i > 0 ? 10 : 0);
            document.add(entryTitle);

            // Date
            Paragraph entryDate = new Paragraph(journal.getCreatedAt().format(formatter), dateFont);
            entryDate.setSpacingAfter(5);
            document.add(entryDate);

            // Content (truncated to 200 characters if too long)
            String content = journal.getContent();
            if (content.length() > 200) {
                content = content.substring(0, 200) + "...";
            }
            Paragraph entryContent = new Paragraph(content, contentFont);
            entryContent.setAlignment(Element.ALIGN_JUSTIFIED);
            entryContent.setSpacingAfter(5);
            document.add(entryContent);

            // Favorite indicator
            if (journal.getIsFavorite()) {
                Font favoriteFont = new Font(Font.HELVETICA, 8, Font.BOLD);
                favoriteFont.setColor(new Color(255, 193, 7)); // Gold color
                Paragraph favorite = new Paragraph("⭐ Favorite Entry", favoriteFont);
                document.add(favorite);
            }
        }
    }

    /**
     * Get mood description with emoji based on score.
     */
    private String getMoodWithEmoji(Integer score) {
        if (score >= 8) return "Very Happy";
        if (score >= 6) return "Happy";
        if (score >= 4) return "Okay";
        if (score >= 2) return "Sad";
        return "Very Sad";
    }

    /**
     * Add footer to PDF.
     */
    private void addFooter(Document document) throws DocumentException {
        document.add(new Paragraph(" "));
        document.add(new Paragraph(" "));

        LineSeparator line = new LineSeparator(0.5f, 100, PEACH_ACCENT, Element.ALIGN_CENTER, -2);
        document.add(line);

        Font footerFont = new Font(Font.HELVETICA, 8, Font.ITALIC);
        footerFont.setColor(TEXT_GRAY);

        Paragraph footer = new Paragraph();
        footer.setAlignment(Element.ALIGN_CENTER);
        footer.setSpacingBefore(10);
        footer.add(new Chunk("This report was generated by SerenMind AI and is for informational purposes only.\n", footerFont));
        footer.add(new Chunk("It does not constitute medical advice. Please consult with a healthcare professional for medical concerns.\n", footerFont));
        footer.add(new Chunk("\nGenerated by SerenMind – Your Mental Wellness Companion\n", footerFont));
        
        // Developer credit
        Font creditFont = new Font(Font.HELVETICA, 7, Font.NORMAL);
        creditFont.setColor(TEXT_GRAY);
        footer.add(new Chunk("Created by Kalpak Manwar | kalpakmanwar@gmail.com | +91-8767309198", creditFont));

        document.add(footer);
    }
}
